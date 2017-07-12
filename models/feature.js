const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GeoSchema = require('./geo');
const TruckSchema = require('./truck');

const FeatureSchema = new Schema({
  type: { type : String, default : 'Feature' },
  geometry: GeoSchema,
  /*properties: { 
  	truck : { type : TruckSchema }
  }*/
});