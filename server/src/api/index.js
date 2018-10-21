const express = require("express");

const slipways = require("./slipways");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏"
  });
});

router.use("/slipways", slipways);

module.exports = router;
