const request = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("Express App", () => {
  describe("GET /", () => {
    it("should return Hello, CI/CD!", async () => {
      const res = await request(app).get("/");
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Hello, CI/CD!");
    });

    it("should return Content-Type text/html", async () => {
      const res = await request(app).get("/");
      expect(res.headers["content-type"]).to.include("text/html");
    });
  });

  describe("GET /health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/health");
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", "healthy");
      expect(res.body).to.have.property("timestamp");
      expect(res.body).to.have.property("uptime");
      expect(res.body).to.have.property("version");
    });

    it("should return Content-Type application/json", async () => {
      const res = await request(app).get("/health");
      expect(res.headers["content-type"]).to.include("application/json");
    });
  });

  describe("GET /nonexistent", () => {
    it("should return 404 for nonexistent routes", async () => {
      const res = await request(app).get("/nonexistent");
      expect(res.status).to.equal(404);
    });
  });
});
