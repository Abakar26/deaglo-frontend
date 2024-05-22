// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    //! TODO: Fix. Wasn't able to figure out how to deploy with SST CLI without ignoring errors
    //! .sst/types/index.ts makes the build fail
    ignoreBuildErrors: true,
  },
  eslint: {
    //! TODO: Remove before going to production
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  transpilePackages: ["ui"],
  webpack: (config) => {
    /** @type {import('webpack').Configuration} */
    if (config.module.rules) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
    }

    return config;
  },
};

module.exports = nextConfig;
