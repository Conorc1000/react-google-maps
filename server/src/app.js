const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require('path');

const cors = require("cors");
const aws = require('aws-sdk');

let expressApp = express();
expressApp.use(express.static('www'));
expressApp.set('port', process.env.PORT || 5000);

var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");
const app = express();

expressApp.use(morgan("dev"));
expressApp.use(helmet());
expressApp.use(express.json());
expressApp.use(cors());

const log = (req, res, next) => {
  next();
}
expressApp.use(log)

expressApp.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + expressApp.get('port'));
});

expressApp.use(express.static(path.join(__dirname + "/../../", 'build')));

expressApp.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + "/../../", 'build', 'index.html'));
});

expressApp.get('/sign_s3', function (req, res) {
  console.log('query========================>>>>>>>>>>>>', req.query);
  console.log(AWS_SECRET_KEY);
  aws.config.update({
    accessKeyId: 'AKIAJ37FIF773HO2ZVWA',
    secretAccessKey: AWS_SECRET_KEY
  });
  var s3 = new aws.S3();
  var s3_params = {
    Bucket: 'boatlaunchphotos',
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
        url: 'https://' + 'boatlaunchphotos' + '.s3.amazonaws.com/' + req.query.imgId
      };
      res.write(JSON.stringify(return_data));
      res.end();
    }
  });
});

expressApp.use("/api/v1", api);

expressApp.use(middlewares.notFound);
expressApp.use(middlewares.errorHandler);

module.exports = expressApp;
