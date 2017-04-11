#!/usr/bin/env node

const path = require("path");
const dockerLambda = require("docker-lambda");
const pkg = require("./package.json");
const shell = require("shelljs");

module.exports = function (outputStats, callback) {
  if (!callback) {
    throw new Error("callback function is missing");
  }
  shell.exec(__dirname + "/bin/invoke-docker-lambda", {silent: true}, (code, stdout, stderr) => {
    if (code == 1) {
      // remove any stderr icons
      let err = stderr.split("\n").slice(0, -1).map(e => e.replace(/[ℹ✔⚠✖]\s/, ""));
      if (outputStats) console.info(stderr);
      callback({
        "error": err,
        "result": stdout
      });
      return;
    }

    if (outputStats) console.info(stderr);
    callback({
      result: stdout
    });
  });
}