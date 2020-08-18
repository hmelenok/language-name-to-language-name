module.exports = {
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        useESModules: true,
        absoluteRuntime: false,
      },
    ],
  ],
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12',
          browsers: ['last 2 versions', 'ie >= 11'],
        },
      },
    ],
  ],
};
