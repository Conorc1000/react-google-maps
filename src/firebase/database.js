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