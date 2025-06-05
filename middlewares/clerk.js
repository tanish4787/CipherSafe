import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

const requireAuth = ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export { requireAuth };
