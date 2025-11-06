const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, CI/CD!");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "1.0.0",
  });
});

module.exports = app;
