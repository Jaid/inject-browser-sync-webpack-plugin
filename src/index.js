/** @module inject-browser-sync-webpack-plugin */

import insertStringBefore from "insert-string-before"

import injection from "./injection.txt"

/**
 * @typedef {Object} Options
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
    this.options = options
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.compilation.tap(_PKG_NAME, compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(_PKG_NAME, (data, cb) => {
        data.html = insertStringBefore(data.html, "</body>", injection)
        cb(null, data)
      })
    })
  }
}