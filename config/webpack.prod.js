// @ts-check

'use strict'

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

/** @return {import('webpack').Configuration} */
const prod = (env, arg) => {
  return {
    mode: 'production',
    output: {
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), `...`],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ],
  }
}

module.exports = (env, argv) => merge(common(env, argv), prod(env, argv))
