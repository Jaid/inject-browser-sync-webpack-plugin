/** @module inject-browser-sync-webpack-plugin */

import createHtmlElement from "create-html-element"
import insertStringBefore from "insert-string-before"

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
        const element = createHtmlElement({
          name: "script",
          html: "document.write(\"<script async src='http://HOST:3000/browser-sync/browser-sync-client.js'></script>\".replace(\"HOST\", location.hostname))",
          attributes: {
            id: "__bs_script__",
            async: true,
          },
        })
        data.html = insertStringBefore(data.html, "</body>", element)
        cb(null, data)
      })
    })
  }
}