const request = require("supertest");

const app = require("../src/app");

describe("GET /api/v1", () => {
  it("responds with a json message", function(done) {
    request(app)
      .get("/api/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "API - 👋🌎🌍🌏"
        },
        done
      );
  });
});

describe("POST /api/v1/slipways", () => {
  it("responds with inserted slipway", function(done) {
    const requestObj = {
      name: "SoutendSailingClub",
      suitability: "unknown",
      longitude: 180,
      latitude: -90
    };

    const reponseObj = {
      ...requestObj,
      _id: "5bc95416d71a1822c9802a47",
      date: "2018-10-19T03:48:38.702Z"
    };

    request(app)
      .post("/api/v1/slipways")
      .send(requestObj)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(res => {
        res.body._id = "5bc95416d71a1822c9802a47";
        res.body.date = "2018-10-19T03:48:38.702Z";
      })
      .expect(200, reponseObj, done);
  });
});
