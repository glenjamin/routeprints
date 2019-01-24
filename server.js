require("@babel/register")({
  only: [/\.ts$/],
  extensions: [".ts"]
});

const http = require("http");

const express = require("express");

const app = require("./server/app").default;
const config = require("./server/config").default;

app.use(express.static("./dist"));

const server = new http.Server(app);

server.listen(config.port, () => {
  console.log("Listening on http://localhost:" + config.port);
});
