const serialize = require("serialize-javascript");

/**
 * @type {import("express").Handler}
 */
module.exports = function openerJsCallbackMiddleware(_req, res, next) {
  /**
   * @param  {string} callbackName
   * @param  {object} data
   * @return {void}
   */
  res.openerJsCallback = (callbackName, data) =>
    openerJsCallback(res, callbackName, data);

  next();
};

/**
 * @param  {import("express").Response} res
 * @param  {string} callbackName
 * @param  {object} data
 * @return {void}
 */
function openerJsCallback(res, callbackName, data) {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Type", "text/html");

  callbackName = callbackName.replace(/[^\[\]\w$.]/g, "");

  res.send(`<script>
    window.opener.${callbackName}(${serialize(data)});
    window.close();
  </script>`);
}
