const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GeoSchema = require('./geo');
const HoursSchema = require('./hours');

const TruckSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    description: {
        type: String
    },
    place: GeoSchema,
    hours: [HoursSchema]
});

const Truck = mongoose.model('truck', TruckSchema);

module.exports = Truck;