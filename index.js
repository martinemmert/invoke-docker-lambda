#!/usr/bin/env node

const path = require("path");
const dockerLambda = require("docker-lambda");
const pkg = require("./package.json");
const shell = require("shelljs");

module.exports = function (outputStats) {
  let res = shell.exec("./bin/invoke-docker-lambda", {
    silent: true
  });
  
  if (res.code == 1) {
    // remove any stderr icons
    let err = res.stderr.split("\n").slice(0, -1).map(e => e.replace(/[ℹ✔⚠✖]\s/, ""));
    if (outputStats) console.info(res.stderr);
    return {"error": err, "result": res.stdout};
  }

  if (outputStats) console.info(res.stderr);
  return {result: res.stdout};
}