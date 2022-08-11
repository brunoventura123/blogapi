import { sign } from "crypto";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import apiUser from '../../../libs/apiUsers'
import { AuthUser } from "../../../types/AuthUser";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        CredentialsProvider({
            id: 'credentials',
            credentials: {
                email: { label: 'E-mail', type: 'text' },
                password: { label: 'Senha', type: 'password' }
            },
            authorize: async (credentials, req) => {
                if (credentials && credentials.email && credentials.password) {
                    const user = await apiUser.getUser(credentials.email, credentials.password)
                    if (user) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token.user = user
            return token
        },
        session: async ({ session, token }) => {
            if (token) session.user = token.user as AuthUser
            return session
        }
    },
    pages: {
        signIn: '/login'
    }

}

export default NextAuth(authOptions)