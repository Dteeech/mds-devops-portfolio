/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Activer l'instrumentation OpenTelemetry
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
