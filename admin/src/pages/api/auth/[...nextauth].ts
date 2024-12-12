import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import pool from '@/lib/db';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const [rows]: any = await pool.execute(
          'SELECT * FROM admins WHERE email = ?',
          [credentials.email]
        );

        const admin = rows[0];
        if (!admin) {
          throw new Error('No user found');
        }

        const isValid = await compare(credentials.password, admin.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name
        };
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
};

export default NextAuth(authOptions);
