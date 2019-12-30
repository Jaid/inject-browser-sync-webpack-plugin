/** @module inject-browser-sync-webpack-plugin */

import createHtmlElement from "create-html-element"
import insertStringAfter from "insert-string-after"

/**
 * @typedef {Object} Options
 * @prop {string} [href = /favicon.ico]
 * @prop {string} [rel = icon]
 * @prop {string} [type = isIco ? "image/x-icon" : "image/png"]
 */

/**
 * @class
 */
export default class HtmlFaviconPlugin {

  /**
   * @constructor
   * @param {Options} [options] Plugin options
   */
  constructor(options) {
    this.options = {
      href: "/favicon.ico",
      rel: "icon",
      ...options,
    }
    if (!this.options.type) {
      const isIco = /\.ico$/i.test(this.options.href)
      this.options.type = isIco ? "image/x-icon" : "image/png"
    }
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.compilation.tap(_PKG_NAME, compilation => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(_PKG_NAME, (data, cb) => {
        const element = createHtmlElement({
          name: "link",
          attributes: {
            rel: this.options.rel,
            type: this.options.type,
            href: this.options.href,
          },
        })
        data.html = insertStringAfter(data.html, "<head>", element)
        cb(null, data)
      })
    })
  }
}