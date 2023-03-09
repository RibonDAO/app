module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias:
          {
            assets: './src/assets',
            components: './src/components',
            config: './src/config',
            contexts: './src/contexts',
            hooks: './src/hooks',
            lib: './src/lib',
            screens: './src/screens',
            services: './src/services',
            styles: './src/styles',
            types: './src/types',
            utils: './src/utils',
          }
        },
      ],
    ],
  };
};
