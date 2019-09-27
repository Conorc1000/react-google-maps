const monk = require("monk");
const db = monk("https://boatlaunch.firebaseio.com");

module.exports = db;
