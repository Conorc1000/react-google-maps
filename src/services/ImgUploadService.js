var AWS = require("aws-sdk");

var albumBucketName = "boatlaunchslipwayphotos";
var bucketRegion = 'eu-west-1'; //could also be Ireland
var IdentityPoolId = 'eu-west-1:06a62dcc-2d0e-44e3-a400-779cc16b2ef0';

const imgUploadService = (file, uploadMsgDiv, newImgId, callback) => {

    console.log("file.type", file.type)
    console.log("uploadMsgDiv", uploadMsgDiv)
    console.log("newImgId", newImgId)

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
      }),
      accessKeyId: 'AKIAJ37FIF773HO2ZVWA'
    });
    
    var s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: albumBucketName }
    });


    var albumPhotosKey = "WebSitePhotos/";
    // s3.listObjects({ Prefix: albumPhotosKey }, function(err, data) {
    //   if (err) {
    //     return alert("There was an error viewing your album: " + err.message);
    //   }

    //   console.log(data)
    // })  

    //Use S3 ManagedUpload class as it supports multipart uploads


    // console.log("albumBucketName", albumBucketName)
    // console.log(" albumPhotosKey + newImgId + jpg", albumPhotosKey + newImgId + ".jpg")
    // console.log("file", file)

    // var upload = new AWS.S3.ManagedUpload({
    //   params: {
    //     Bucket: albumBucketName,
    //     Key: albumPhotosKey + newImgId + ".jpg",
    //     Body: file,
    //     ACL: "public-read"
    //   }
    // });

    // var promise = upload.promise();

    // promise.then(
    //   function(data) {
    //     alert("Successfully uploaded photo.");
    //     //viewAlbum(albumName);
    //   },
    //   function(err) {
    //     console.log(err)
    //     return alert("There was an error uploading your photo: ", err.message);
    //   }
    // );


    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:5000/sign_s3?file_name=" + newImgId + "___Source.jpg" + "&file_type=" + file.type);
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
          uploadMsgDiv.innerHTML = '<h3>File sucessfully uploaded!</h3>';
        }
      };
      xhr.onerror = function() {
        alert("Could not upload file.");
      };
      xhr.send(file);
    }

};

module.exports = imgUploadService;
