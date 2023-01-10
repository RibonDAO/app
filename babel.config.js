module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias:
          {
            assets: './src/assets',
            components: './src/components',
            config: './src/config',
            hooks: './src/hooks',
            screens: './src/screens',
            services: './src/services',
            types: './src/types',
            utils: './src/utils',
            styles: './src/styles',
          }
        },
      ],
    ],
  };
};
