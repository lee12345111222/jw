const { when } = require('@craco/craco');

const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('src')
    },
    plugins: [
      ...when(
        true,
        () => [
          () => [
            new TerserPlugin({
              minify: TerserPlugin.swcMinify,
              terserOptions: {
                // compress: {
                //   drop_debugger: IS_PROD,
                //   drop_console: IS_PROD
                // }
              }
            })
          ]
        ],
        []
      )
    ]
  }
};
