const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require('path');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

let expressApp = express();

const middlewares = require("./middlewares");
const api = require("./api");

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

expressApp.use(express.static('www'));
expressApp.set('port', PORT);

expressApp.use(helmet());
expressApp.use(express.json());

if (isDev ) {
  expressApp.use(morgan("dev"));
}

expressApp.listen(express().get('port'), function () {
  console.log('Express server listening on port ' + expressApp.get('port'));
});

expressApp.get('/sign_s3',function (req, res) {

  console.log("req.query", req.query)
  aws.config.update({
    accessKeyId: process.env.AWS_SECRET_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  var s3 = new aws.S3();
  var s3_params = {
    Bucket: process.env.S3_PHOTOS_BUCKET,
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
        url: 'https://' + process.env.S3_PHOTOS_BUCKET + '.s3.amazonaws.com/' + req.query.file_name
      };
      res.write(JSON.stringify(return_data));
      res.end();
    }
  });
});

expressApp.use(express.static(path.join(__dirname + "/../../", 'build')));

expressApp.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + "/../../", 'build', 'index.html'));
});

expressApp.use("/api/v1", api);

expressApp.use(middlewares.notFound);
expressApp.use(middlewares.errorHandler);



module.exports = expressApp;
