module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [
          path.resolve(__dirname, './src/assets/styles/main.scss'),
      ],
    },
  },
};
