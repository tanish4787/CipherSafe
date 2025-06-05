import { requireAuth } from './clerk.js';
import authenticate from './auth.js';

const fullAuth = [requireAuth, authenticate];

export default fullAuth;
