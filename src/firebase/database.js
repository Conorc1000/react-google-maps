import {database} from './firebase';

export const getLatLngsSnapshot = (callback) => 
  database.ref('latLngs')
    .once('value')
    .then((snapshot) => {
      callback(snapshot.val());
    });

export const getSlipwayDetailsSnapshot = (callback) => 
  database.ref('slipwayDetails')
    .once('value')
    .then((snapshot) => {
      callback(snapshot.val());
    });

export const updateSlipwayDetails = (slipwayDetails, callback) => 
  database.ref('slipwayDetails/'+ slipwayDetails.idKey)
    .update(slipwayDetails
    , function(error) {
      if (error) {
        console.log("failed to save Details")
        callback(error, null)
      } else {
        console.log("Details saved successfully!")
        callback()
      }
    });

export const updateLatLng = (latLng, callback) => 
  database.ref('latLngs/'+ latLng.idKey)
    .update([latLng.lat, latLng.lng, latLng.idKey]
    , function(error) {
      if (error) {
        console.log("failed to save lat lng")
        callback(null, error)
      } else {
        console.log("Lat lng saved successfully!")
        callback()
      }
    });

// export const createSlipwayDetails = (slipwayDetails, callback) => 
//   database.ref('slipwayDetails/')
//     .create(slipwayDetails
//     , function(error) {
//       if (error) {
//         console.log("failed to save Details")
//         callback(null, error)
//       } else {
//         console.log("Details saved successfully!")
//         callback()
//       }
//     });

// export const createLatLng = (latLng, callback) => 
//   database.ref('latLngs/')
//     .create([latLng.lat, latLng.lng, latLng.idKey]
//     , function(error) {
//       if (error) {
//         console.log("failed to save lat lng")
//         callback(null, error)
//       } else {
//         console.log("Lat lng saved successfully!")
//         callback()
//       }
//     });