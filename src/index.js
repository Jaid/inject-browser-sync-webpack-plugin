/** @module inject-browser-sync-webpack-plugin */

import HtmlWebpackPlugin from "html-webpack-plugin"
import insertStringAfter from "insert-string-after"

import injectionTemplate from "./injection.hbs"

import debug from "lib/debug"

/**
 * @typedef {Object} Options
 * @prop {number} [port=3000]
 * @prop {string} [scriptProtocol="http"]
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
      scriptProtocol: "http",
      ...options,
    }
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    debug("Options: %o", this.options)
    const injection = injectionTemplate({
      options: this.options,
    })
    compiler.hooks.compilation.tap(process.env.REPLACE_PKG_NAME, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(process.env.REPLACE_PKG_NAME, data => {
        debug("Before: %s", data.html)
        data.html = insertStringAfter(data.html, "<body>", injection)
        debug("After: %s", data.html)
      })
    })
  }
}