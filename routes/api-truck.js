const express = require('express');
const router = express.Router();
const Truck = require('../models/truck');
const Event = require('../models/event');
const config = require('../config');


// get the list of trucks from the db
router.get('/trucks', function(req, res, next){
	var lng = req.query.lng || config.lng_default;
	var lat = req.query.lat || config.lat_default;
	var max = req.query.max || config.maxDistance_default;

    Truck.geoNear(
        {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
        {maxDistance: parseInt(max), spherical: true}
    ).then(function(trucks){
        res.send(trucks);
    }).catch(next);
});

// add new truck to the db
router.post('/trucks', function(req, res, next){
    Truck.create(req.body).then(function(truck){
        res.send(truck);
    }).catch(next);
});

// get a truck from db
router.get('/trucks/:id', function(req, res, next){
	Truck.findOne({ _id : req.params.id }).then(function(truck){
		res.send(truck);
	}).cathc(next);
});

// update a truck in the db
router.put('/trucks/:id', function(req, res, next){
	Truck.findByIdAndUpdate({_id : req.params.id}, req.body).then(function(){
		Truck.findOne({ _id : req.params.id}).then(function(truck){
			res.send(truck);
		});
	}).catch(next);
});

// delete a truck from db
router.delete('/trucks/:id', function(req, res, next){
	Truck.findByIdAndRemove({ _id : req.params.id }).then(function(truck){
		res.send(truck);
	}).catch(next);
});


// ++++++++ EVENTS +++++++ //

// add new event for a truck to the db
router.post('/events', function(req, res, next){
    const idTruck = req.body.idTruck;
    Truck.findOne({ _id : idTruck }).then(function(truck){
    	if (truck == null)
    		throw new Error("The Truck isn't exists");
		Event.create(req.body).then(function(event){
        	res.send(event);
    	}).catch(next);
	}).catch(next);
});

// get the list of trucks from the db
router.get('/events', function(req, res, next){
	var lng = req.query.lng || config.lng_default;
	var lat = req.query.lat || config.lat_default;
	var max = req.query.max || config.maxDistance_default;

    Event.geoNear(
        {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
        {maxDistance: parseInt(max), spherical: true}
    ).then(function(events){
        res.send(events);
    }).catch(next);
});

module.exports = router;
