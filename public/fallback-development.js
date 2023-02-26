/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable no-fallthrough */
/* eslint-disable no-empty */
/* eslint-disable indent */
/******/ (() => { // webpackBootstrap
/******/ 'use strict'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let __webpack_exports__ = {}


self.fallback = async request => {
  // https://developer.mozilla.org/en-US/docs/Web/API/RequestDestination
  switch (request.destination) {
    case 'document':
      // eslint-disable-next-line quotes
      if (true) return caches.match("/_offline", {
        ignoreSearch: true
      })
    case 'image':
      if (false) {}
    case 'audio':
      if (false) {}
    case 'video':
      if (false) {}
    case 'font':
      if (false) {}
    case '':
      if (false) {}
    default:
      return Response.error()
  }
}
/******/ })()
