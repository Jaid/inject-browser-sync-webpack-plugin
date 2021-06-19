/** @module inject-browser-sync-webpack-plugin */

import HtmlWebpackPlugin from "html-webpack-plugin"
import insertStringBefore from "insert-string-before"

import injectionTemplate from "./injection.hbs"

/**
 * @typedef {Object} Options
 * @prop {number} [port = 3000]
 */

/**
 * @class
 */
export default class InjectBrowserSyncPlugin {

  /**
   * @constructor
   * @param {Options} [options] Plugin options
   */
  constructor(options) {
    this.options = {
      port: 3000,
      ...options,
    }
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    const injection = injectionTemplate({
      options: this.options,
    })
    compiler.hooks.compilation.tap(process.env.REPLACE_PKG_NAME, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(process.env.REPLACE_PKG_NAME, (data, cb) => {
        data.html = insertStringBefore(data.html, "</body>", injection)
        cb(null, data)
      })
    })
  }
}