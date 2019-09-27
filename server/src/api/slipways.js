const express = require("express");
const Joi = require("joi");
const router = express.Router();
const db = require("../db");
const slipways = db.get("slipways");

const schema = Joi.object()
  .keys({
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    suitability: Joi.string()
      .min(3)
      .max(100)
      .required(),
    latitude: Joi.number()
      .min(-90)
      .max(90)
      .required(),
    longitude: Joi.number()
      .min(-180)
      .max(180)
      .required()
  })
  .with("username", "birthyear")
  .without("password", "access_token");

router.get("/", (req, res) => {
  res.json([]);
});

router.post("/", (req, res, next) => {

  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const { name, suitability, longitude, latitude } = req.body;
    const slipway = {
      name,
      suitability,
      latitude,
      longitude,
      date: new Date()
    };

    console.log("slipway", slipway);

    slipways.insert(slipway).then(insertedSlipway => {

      console.log("insertedSlipway", insertedSlipway);

      res.json(insertedSlipway);
    });
  } else {
    next(result.error);
  }
});

module.exports = router;
