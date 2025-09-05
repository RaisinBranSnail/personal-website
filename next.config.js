/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  webpack(config) {
    const rules = config.module.rules || [];
    rules.forEach((rule) => {
      const oneOf = rule.oneOf || [];
      oneOf.forEach((one) => {
        if (Array.isArray(one.use)) {
          one.use.forEach((u) => {
            if (
              u && u.loader && typeof u.loader === 'string' &&
              u.loader.includes('css-loader') && u.options && u.options.modules
            ) {
              u.options.modules.localIdentName = '[name]__[local]';
            }
          });
        }
      });
    });
    return config;
  }
};

module.exports = nextConfig;
