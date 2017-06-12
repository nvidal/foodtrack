const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

const TruckSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    description: {
        type: String
    },
    from : Date, 
    until : Date,
    place: GeoSchema
});

const Truck = mongoose.model('truck', TruckSchema);

module.exports = Truck;