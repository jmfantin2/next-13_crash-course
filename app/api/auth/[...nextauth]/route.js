import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      //this basically updates it & makes sure they're currently online
      return session;
    },
    async signIn({ profile }) {
      try {
        //serverless -> lambda (opens only when called) -> dynamodb
        await connectToDB();
        // check if a user already exists (and that needs a Model)
        const userExists = await User.findOne({ email: profile.email });
        // if not, create a new user and save it
        if (!userExists) {
          await User.create({
            email: profile.email,
            //special characters could break the insertion and must be treated
            username: profile.name.replace(/[^a-zA-Z]+/g, '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
