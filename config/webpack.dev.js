// @ts-check

'use strict'

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

/** @return {import('webpack').Configuration } */
const dev = () => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
    },
    devServer: {
      open: true,
      client: {
        progress: true,
      },
    },
  }
}

module.exports = (env, argv) => merge(common(env, argv), dev(env, argv))
