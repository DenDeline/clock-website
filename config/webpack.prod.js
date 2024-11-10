// @ts-check

'use strict'

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @return {import('webpack').Configuration} */
const prod = (env, arg) => {
  return {
    output: {
      clean: true,
    },
    mode: 'production',
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    ],
  }
}

module.exports = (env, argv) => merge(common(env, argv), prod(env, argv))
