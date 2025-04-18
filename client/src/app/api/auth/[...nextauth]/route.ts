import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";

import { compare } from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { LoginExpress } from "../../../../../actions/auth/login";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile: any){
        // const {email} = profile;
          console.log('Par ye to chla')
        try
        {
            const resp = await LoginExpress(profile);
            return resp.data
        }
        catch(err: any)
        {
          throw new Error("Server Error");
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.X_CLIENT_ID as string,
      clientSecret: process.env.X_SECRET as string,

      async profile(profile, token:any) {
        console.log("challeya")
        console.log(profile)
        return profile;
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role.Title;
        token.image = user.image;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.id = token.id;
      return session;
    },
  },
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };