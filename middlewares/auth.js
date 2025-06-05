import { clerkClient } from '@clerk/clerk-sdk-node';

const authenticate = async (req, res, next) => {
    try {
        const { userId } = req.auth;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: No user ID found' });
        }

        const user = await clerkClient.users.getUser(userId);

        req.user = {
            id: user.id,
            email: user.emailAddresses?.[0]?.emailAddress,
            name: user.firstName || user.username || '',
        };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid user session' });
    }
};

export default authenticate;
