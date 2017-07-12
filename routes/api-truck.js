const express = require('express');
const router = express.Router();
const Truck = require('../models/truck');
const Event = require('../models/event');
const config = require('../config');
const Feature = require('../models/feature');


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

// get the list of trucks from the db
router.get('/trucks/within', function(req, res, next){
	//specify longitude first.
	var bl_lng = req.query.bl_lng || config.bl_lng_default;
	var bl_lat = req.query.bl_lat || config.bl_lat_default;
	var ur_lng = req.query.ur_lng || config.ur_lng_default;
	var ur_lat = req.query.ur_lat || config.ur_lat_default;

	Truck.where('place.coordinates')
	.within({ box: [
		[parseFloat(bl_lng), parseFloat(bl_lat)], [parseFloat(ur_lng), parseFloat(ur_lat)]] })
	.then(function(trucks){
		//console.log(trucks);
		var list = [];
		for( var i = 0; i< trucks.length; i++){
			//console.log(trucks[i]);
			list.push({
					type : 'Feature',
					geometry : trucks[i].place,
					properties : {
						truck : trucks[i]
					}
				});
		};
		const result = {
			type : 'FeatureCollection',
			features : list,
		};
        res.send(result);
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

// get the list of events from the db
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

// get the list of events from the db
router.get('/events/within', function(req, res, next){
	//specify longitude first.
	var bl_lng = req.query.bl_lng || config.bl_lng_default;
	var bl_lat = req.query.bl_lat || config.bl_lat_default;
	var ur_lng = req.query.ur_lng || config.ur_lng_default;
	var ur_lat = req.query.ur_lat || config.ur_lat_default;

	Event.where('place.coordinates')
	.within({ box: [
		[parseFloat(bl_lng), parseFloat(bl_lat)], [parseFloat(ur_lng), parseFloat(ur_lat)]] })
	.then(function(events){
        res.send(events);
    }).catch(next);
});

module.exports = router;
