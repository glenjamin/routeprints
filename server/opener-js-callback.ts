import express from "express";
import serialize from "serialize-javascript";

export default function openerJsCallback(
  res: express.Response,
  callbackName: string,
  data: object
): void {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Type", "text/html");

  callbackName = callbackName.replace(/[^\[\]\w$.]/g, "");

  res.send(`<script>
    window.opener.${callbackName}(${serialize(data)});
    window.close();
  </script>`);
}
