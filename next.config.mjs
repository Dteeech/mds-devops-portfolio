/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Requis pour que le build détecte instrumentation.js en mode standalone
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
