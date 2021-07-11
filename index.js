module.exports =
  ({ enabled = true } = {}) =>
  (nextConfig = {}) => {
    return Object.assign({}, nextConfig, {
      webpack5: false,
      webpack(config, options) {
        if (enabled) {
          if (options.isServer) {
            require("./scripts/generateGraphQLLet");
          }

          config.module.rules.push({
            test: /\.(graphql)$/,
            exclude: /node_modules/,
            use: [
              options.defaultLoaders.babel,
              { loader: "graphql-let/loader" },
            ],
          });

          config.module.rules.push({
            test: /\.graphqls$/,
            exclude: /node_modules/,
            use: ["graphql-let/schema/loader"],
          });
        }

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    });
  };
