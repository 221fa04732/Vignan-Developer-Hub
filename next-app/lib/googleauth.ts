import { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }
    interface User {
        id: string;
        role: string;
    }
}

const authOption : NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user?.email || !user?.name || !user?.image) return false;
            const existing = await prisma.user.findUnique({
                where: {
                    email : user.email
                }
            });
            if (!existing) {
                await prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: "USER",
                    },
                });
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user && user.email) {
                const dbUser = await prisma.user.findUnique({
                    where: { 
                        email: user.email 
                    },
                });
                token.id = dbUser?.id;
                token.role = dbUser?.role ?? "USER";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default authOption;