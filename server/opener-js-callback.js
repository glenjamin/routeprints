const serialize = require("serialize-javascript");

/**
 * @param  {import("express").Response} res
 * @param  {string} callbackName
 * @param  {object} data
 * @return {void}
 */
module.exports = function openerJsCallback(res, callbackName, data) {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Type", "text/html");

  callbackName = callbackName.replace(/[^\[\]\w$.]/g, "");

  res.send(`<script>
    window.opener.${callbackName}(${serialize(data)});
    window.close();
  </script>`);
};
