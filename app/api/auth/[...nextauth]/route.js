import { ClientSession } from "mongodb";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from "@/utils/database";
import User  from "@/models/user";

// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log("hi");

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email : session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
    
        },
        async signIn({ profile }) {
            try {
    
                await connectToDB();
    
                const userExist = await User.findOne({ //if user exists
                    email : profile.email
                });
    
                if(!userExist) {
                    await User.create({
                        email : profile.email,
                        username : profile.name.replace(" ","").toLowerCase(),
                        image : profile.picture
                    })
                }
    
                // check if a user already exist or not
                return true;
            }
            catch(error) {
                console.log(error);
                return false;
            }
    
        }
    
    
    }
})

export { handler as GET, handler as POST };