const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GeoSchema = require('./geo');

const EventTruckSchema = new Schema({
    idTruck : { 
    	type : Schema.Types.ObjectId,
    	required: [true, 'idTruck is required']
    },
    description: {
        type: String
    },
    place: GeoSchema,
    date : Date,
    from : String, // 1530-> 15:30 | 0815-> 8:15
    until : String, // 1530-> 15:30 | 0815-> 8:15
});

const Event = mongoose.model('event', EventTruckSchema);

module.exports = Event;