/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['ecommerce.routemisr.com']
    },
    async rewrites() {
        return [
            {
                source: '/api/auth/v1/:path*',
                destination: 'https://ecommerce.routemisr.com/api/v1/:path*',
            },
        ];
    },
};

export default nextConfig;