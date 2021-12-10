const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
};

module.exports = () => [
  {
    test: /\.(styl)$/,
    use: [
      'style-loader',
      cssLoader,
      // 'css-loader',
      {
        loader: 'stylus-loader', // compiles Stylus to CSS
        options: {
          preferPathResolver: 'webpack',
        },
      },
    ],
  },
  {
    test: /\.(css)$/,
    use: ['style-loader', cssLoader],
  },
  {
    test: /\.(scss)$/,
    use: ['style-loader', cssLoader, 'sass-loader'],
  },
];
