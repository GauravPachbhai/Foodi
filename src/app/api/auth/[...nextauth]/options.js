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

        // Determine if login is for a user or a restaurant
        const user = await User.findOne({
            $or:[
                {email: credentials.identifier },
                {username: credentials.username}
            ]
            
        });
        const restaurant = await Restaurant.findOne({ email: credentials.email });

        const account = user || restaurant;
        // console.log(credentials)
        if (!account) {
          throw new Error('No account found');
        }
        if (!account.isVerified) {
            throw new Error('Please verify your account before logging in');
          }

        const isValidPassword = await bcrypt.compare(credentials.password, account.password);

        if (!isValidPassword) {
          throw new Error('Invalid credentials');
        }

        return {
          id: account._id,
          email: account.email,
          role: account.role,
          name: user ? `${user.firstName} ${user.lastName}` : restaurant.restaurantName,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.role = user.role; // Add role to JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.role = token.role; // Add role to session
      }
      return session;
    }
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
