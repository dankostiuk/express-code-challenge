const app = require("../index");
const request = require("supertest");
require("../db/initial_db");

describe("Users route", async function() {
  let notValidDomain = function(res) {
    return (
      res.body.errors[0][0].msg ===
      "The user's email must belong to a valid institution."
    );
  };

  let notValidRole = function(res) {
    return (
      res.body.errors[0][0].msg ===
      "Role must be one of: student, academic, or administrator."
    );
  };

  let notValidEmail = function(res) {
    return res.body.errors[0][0].msg === "Must be a valid email.";
  };

  it("Create user with invalid domain", function() {
    request(app)
      .post("/users/create")
      .set("Content-Type", "application/json")
      .send({
        name: "dan",
        email: "dan@test.com",
        role: "administrator",
        password: "pass123"
      })
      .expect(400)
      .expect(notValidDomain)
      .end(function(err, res) {
        if (err) throw err;
      });
  });

  it("Create user with invalid role", function() {
    request(app)
      .post("/users/create")
      .set("Content-Type", "application/json")
      .send({
        name: "dan",
        email: "dan@mcgill.ca",
        role: "admin",
        password: "pass123"
      })
      .expect(400)
      .expect(notValidRole)
      .end(function(err, res) {
        if (err) throw err;
      });
  });

  it("Create user with invalid email", function() {
    request(app)
      .post("/users/create")
      .set("Content-Type", "application/json")
      .send({
        name: "dan",
        email: "dansemail",
        role: "admin",
        password: "pass123"
      })
      .expect(400)
      .expect(notValidEmail)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});

describe("Books route", function() {
  it("Get books when not authenticated", function() {
    request(app)
      .get("/books")
      .expect(403)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});
