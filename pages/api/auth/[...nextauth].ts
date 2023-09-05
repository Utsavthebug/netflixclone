import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import prismadb from '@/lib/prismadb'
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions = {
    providers : [
            CredentialsProvider({
                id:'credentials',
                name:'credentials',
                credentials:{
                    email:{
                        label:'Email',
                        type:'text'
                    },
                    password:{
                        label:'Password',
                        type:'password'
                    }
                },
                async authorize(credentials, req) {
                    if(!credentials?.email || !credentials?.password){
                        throw new Error("Email and Password required")
                    }
                    const user = await prismadb.user.findUnique({
                        where:{
                            email:credentials.email
                        }
                    })
                    if(!user || !user.hashedPassword){
                        throw new Error('Email does not exists')
                    }
                
                    const isCorrectPassword = await compare(credentials.password,user.hashedPassword)

                    if(!isCorrectPassword){
                        throw new Error('Incorrect Email or Password')
                    }


                    return user
                },
            })
    ],
    pages:{
        signIn:'/auth'
    },
    debug: process.env.NODE_ENV ==='development',
    session:{
        strategy:'jwt'
    }
}

export default NextAuth(authOptions)