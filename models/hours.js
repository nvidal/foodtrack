const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HoursSchema = new Schema({
    day: Number, //1 (Sunday) and 7 (Saturday)
    from : String, // 1530-> 15:30 | 0815-> 8:15
    until : String, // 1530-> 15:30 | 0815-> 8:15
});


