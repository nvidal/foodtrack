const express = require('express');
const router = express.Router();
const Truck = require('../models/truck');
const config = require('../config');


// get the list of trucks from the db
router.get('/trucks', function(req, res, next){
	var lng = req.query.lng || config.lng_default;
	var lat = req.query.lat || config.lat_default;

    Truck.geoNear(
        {type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
        {maxDistance: 100000, spherical: true}
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

// update a truck in the db
router.put('/trucks/:id', function(req, res, next){
	Truck.findByIdAndUpdate({_id : req.params.id}, req.body).then(function(){
		Truck.findOne({ _id : req.params.id}).then(function(truck){
			res.send(truck);
		});
	}).catch(next);
});

// delete a truck from db
router.delete('/trucks:id', function(req, res, next){
	Truck.findByIdAndRemove({ _id : req.params.id }).then(function(truck){
		res.send(truck);
	}).cathc(next);
});

module.exports = router;
