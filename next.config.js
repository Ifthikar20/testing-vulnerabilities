module.exports = {
  webpack: (config, { isServer }) => {
    // Disable webpack cache to prevent "Unable to snapshot resolve dependencies" warnings
    config.cache = false;
    return config;
  },
};