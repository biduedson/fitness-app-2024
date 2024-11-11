import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'lh3.googleusercontent.com' },
        { hostname: 'platform-lookaside.fbsbx.com' },
        { hostname: 'facebook.com' },
        { hostname: 'fbcdn.net' },
        ],
    },
};

export default nextConfig;