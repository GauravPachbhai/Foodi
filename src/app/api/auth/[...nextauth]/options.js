import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import Restaurant from '@/models/Restaurant';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        await dbConnect();

        // Check for User or Restaurant
        const user = await User.findOne({
          $or: [{ email: credentials.identifier }, { username: credentials.identifier }],
        });

        const restaurant = await Restaurant.findOne({
          $or: [{ email: credentials.identifier }, { username: credentials.identifier }]
        });

        const account = user || restaurant;
        // console.log(account)

        if (!account) {
          throw new Error('No account found');
        }

        if (account.isVerified === false || account.isVerified === undefined) {
          throw new Error('Please verify your account before logging in');
        }

        const isValidPassword = await bcrypt.compare(credentials.password, account.password);
        console.log(isValidPassword)

        if (!isValidPassword) {
          throw new Error('Invalid credentials');
        }

        return {
          id: account._id.toString(),
          email: account.email,
          username: account.username,
          role: account.role,
          isVerified: account.isVerified,
          name: user
            ? `${user.firstName} ${user.lastName}`
            : restaurant.restaurantName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {

      if (account) {
        token._id = account.id;
        token.email = account.email;
        token.username = account.username;
        token.role = account.role;
        token.isVerified = account.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id,
          email: token.email,
          username: token.username,
          role: token.role,
          isVerified: token.isVerified,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
