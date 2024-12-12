import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const DUMMY_USER = {
  id: '1',
  email: 'admin@trilogy-studios.com',
  password: 'admin123' // In production, this would be hashed
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === DUMMY_USER.email && 
            credentials?.password === DUMMY_USER.password) {
          return { id: DUMMY_USER.id, email: DUMMY_USER.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  }
});
