import GitHub from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';

export default defineConfig({
    providers: [],
    session: {
      strategy: 'jwt',
      cookie: {
        name: 'auth_token',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    },
    secret: 'hossio',
  });