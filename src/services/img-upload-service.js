var AWS = require("aws-sdk");

var albumBucketName = process.env.REACT_APP_S3_PHOTOS_BUCKET
var bucketRegion = process.env.REACT_APP_S3_REGION //could also be Ireland
var IdentityPoolId = 'eu-west-1:06a62dcc-2d0e-44e3-a400-779cc16b2ef0';

const imgUploadService = (file, uploadMsgDiv, newImgId, callback) => {

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      }),
      accessKeyId: 'AKIAJEM2Z5AOOKJULVZA'
    });

    var s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: albumBucketName }
    });

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/sign_s3?file_name=" + newImgId + "___Source.jpg" + "&file_type=" + file.type);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {

          console.log("xhr.responseText", xhr.responseText)
          var response = JSON.parse(xhr.responseText);
          upload_file(file, response.signed_request, response.url);
        } else {
          alert("Could not get signed URL.");
        }
      }
    };
    xhr.send();

    function upload_file(file, signed_request, url) {
      console.log('upload_file, url', url);
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signed_request);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      xhr.onload = function(loadResponse) {
        if (xhr.status === 200) {
          uploadMsgDiv.innerHTML = '<p>Image sucessfully uploaded</p>';
          callback()
        }
      };
      xhr.onerror = function() {
        alert("Could not upload file.");
      };
      xhr.send(file);
    }

};

module.exports = imgUploadService;
