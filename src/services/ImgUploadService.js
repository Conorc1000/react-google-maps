// .factory("ImgUploadService", function(SlipwayDetailsService, firebaseRef) {

//     var uniqueImageNumber = 0;
  
//     AWS.config.update({
//       accessKeyId: 'AKIAJ37FIF773HO2ZVWA'
//     });
//     AWS.config.region = 'eu-west-1'; //could also be Ireland
  
//     // Initialize the Amazon Cognito credentials provider
//     AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//       IdentityPoolId: 'eu-west-1:06a62dcc-2d0e-44e3-a400-779cc16b2ef0',
//     });
  
  
//     var uploadImg = function(fileChooser, results, slipway) {
  
//       if (!slipway.imgs) {
//         slipway.imgs = [];
//       }
//       var imgId = "New" + Date.now();
  
//       var file = fileChooser.files[0];
  
//       if(!file)
//       {
//         alert('No image selected to upload. Please choose file first.')
//         return;
//       }
  
//       slipway.imgs.push(imgId);
//       firebaseRef.child("slipwayDetails").child(slipway.idKey).child("imgs").set(slipway.imgs, function(err) {
//         if (err) {
//           console.log('push imgId to firebase failed', error);
//         } else {
//           console.log('push imgId to firebase succeeded');
//           putImgToAWS(imgId, fileChooser);
//         }
//       });
  
//     };
  
//     function putImgToAWS(imgId, fileChooser) {
  
//       var file = fileChooser.files[0];
  
//       if (file) {
  
//         if(file.size > 20971520)
//         {
//           alert('File too large. Please upload an image of less than 20Mb');
//           return;
//         }
  
//         results.innerHTML = '';
  
//         get_signed_request(file, imgId);
  
//       } else {
//         results.innerHTML = 'Nothing to upload.';
//       }
//     }
  
//     function get_signed_request(file, imgId) {
//       var xhr = new XMLHttpRequest();
//       xhr.open("GET", "/sign_s3?file_name=" + imgId + "___Source.jpg" + "&file_type=" + file.type);
//       xhr.onreadystatechange = function() {
//         if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//             var response = JSON.parse(xhr.responseText);
//             upload_file(file, response.signed_request, response.url);
//           } else {
//             alert("Could not get signed URL.");
//           }
//         }
//       };
//       xhr.send();
//     }
  
//     function upload_file(file, signed_request, url) {
//       console.log('upload_file, url', url);
//       var xhr = new XMLHttpRequest();
//       xhr.open("PUT", signed_request);
//       xhr.setRequestHeader('x-amz-acl', 'public-read');
//       xhr.onload = function(loadResponse) {
//         if (xhr.status === 200) {
//           results.innerHTML = '<h3>File sucessfully uploaded!</h3>';
//         }
//       };
//       xhr.onerror = function() {
//         alert("Could not upload file.");
//       };
//       xhr.send(file);
//     }
  
//     return {
//       uploadImg: uploadImg
//     };
//   });
  