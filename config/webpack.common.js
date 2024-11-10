// @ts-check
'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/

module.exports = /** @type { import('webpack').Configuration } */ (webpackEnv, argv) => {
  const isEnvProduction = process.env.NODE_ENV === 'production'

  const getStyleLoaders = (cssOptions) => {
    return [
      isEnvProduction
        ? {
            loader: MiniCssExtractPlugin.loader,
            // css is located in `static/css`, use '../../' to locate index.html folder
            // in production `paths.publicUrlOrPath` can be a relative path
          }
        : require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            config: false,
            plugins: [
              'postcss-flexbugs-fixes',
              [
                'postcss-preset-env',
                {
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                },
              ],
              // Adds PostCSS Normalize as the reset css with default options,
              // so that it honors browserslist config in package.json
              // which in turn let's users customize the target behavior as per their needs.
              'postcss-normalize',
            ],
          },
        },
      },
    ].filter(Boolean)
  }

  return {
    entry: {
      app: './src/index.ts',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              mode: 'icss',
            },
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        // {
        //   test: cssModuleRegex,
        //   use: getStyleLoaders({
        //     importLoaders: 1,
        //     modules: {
        //       mode: 'local',
        //       // getLocalIdent: getCSSModuleLocalIdent,
        //     },
        //   }),
        // },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      assetModuleFilename: 'static/media/[name].[hash][ext]',
    },
    plugins: [
      new HtmlWebpackPlugin({
        cache: false,
        inject: true,
        template: path.resolve(__dirname, '../public/index.html'),
      }),
    ],
  }
}
