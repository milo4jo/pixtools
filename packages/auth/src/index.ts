import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

/**
 * Create NextAuth options for a PixTools app
 */
export function createAuthOptions(appId: string): NextAuthOptions {
  return {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === 'github' && user.email) {
          // Here you could call getOrCreateUser from @pixtools/database
          // For now, just allow sign in
          return true;
        }
        return false;
      },
      async session({ session, token }) {
        if (session.user) {
          // Add user ID to session
          (session.user as { id?: string }).id = token.sub;
        }
        return session;
      },
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
    },
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
    },
  };
}

export type { NextAuthOptions };
