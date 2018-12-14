const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
var aws = require('aws-sdk');

var app = express();
app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);

var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
console.log(AWS_SECRET_KEY);
require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cors());

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/sign_s3', function (req, res) {
  console.log('query========================>>>>>>>>>>>>', req.query);
  console.log(AWS_SECRET_KEY);
  aws.config.update({
    accessKeyId: 'AKIAJ37FIF773HO2ZVWA',
    secretAccessKey: AWS_SECRET_KEY
  });
  var s3 = new aws.S3();
  var s3_params = {
    Bucket: 'boatlaunchslipwayphotos',
    Key: 'WebSitePhotos/' + req.query.file_name,
    Expires: 60,
    ContentType: req.query.file_type,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3_params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var return_data = {
        signed_request: data,
        url: 'https://' + 'boatlaunchslipwayphotos' + '.s3.amazonaws.com/' + req.query.imgId
      };
      res.write(JSON.stringify(return_data));
      res.end();
    }
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄"
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;