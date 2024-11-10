// @ts-check

'use strict'

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

/** @return {import('webpack').Configuration } */
const dev = () => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      open: true,
      client: {
        progress: true,
      },
    },
  }
}

module.exports = (env, argv) => merge(common(env, argv), dev(env, argv))
