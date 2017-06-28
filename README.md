# foodtrack

REST API

++++ TRUCK ++++
+++++++++++++++
[POST http://localhost:3000/api/trucks]
> Add a new truck to db. (day is number 1 (Sunday) and 7 (Saturday))
Body example:

{ 
	"name": "Truck Name",
    "description": "A funny description",
    "place" : { "type": "point", "coordinates" : [-35, -55] },
    "hours": [
    	{
    	"day": 1,
		"from": "1200",
		"until": "1800"
    	},
    	{
    	"day": 6,
		"from": "1200",
		"until": "1800"
    	},
    	{
    	"day": 7,
		"from": "1200",
		"until": "1800"
    	}
    ]
}

[GET http://localhost:3000/api/trucks?lng=-35&lat=-55&max=10000]
> Get the trucks near the position lng/lat with a max distance max

*** NEW ***
[GET http://localhost:3000/api/trucks/within?bl_lng=-34&bl_lat=-55&ur_lng=33&ur_lat=53]
> Get the trucks within the box [[bl_lng,bl_lat], [ur_lng, ur_lat]]


[GET http://localhost:3000/api/trucks/593e91758d07370f1de206cb]
> Get a truck

[PUT http://localhost:3000/api/trucks/593e91758d07370f1de206cb]
> Update a truck



++++ EVENTS ++++
++++++++++++++++
[POST http://localhost:3000/api/events]
> Add a new event for the truck idTruck to db.
Body example:

{
    "idTruck" : "593e91758d07370f1de206cb",
    "description": "",
    "place":  { "type": "point", "coordinates" : [-35, -55] },
    "date" : "2017-06-15",
    "from" : "0900",
    "until" : "1500"
}

[GET http://localhost:3000/api/events?lng=-35&lat=-55&max=10000]
> Get the events near the position lng/lat with a max distance max

*** NEW ***
[GET http://localhost:3000/api/events/within?bl_lng=-34&bl_lat=-55&ur_lng=33&ur_lat=53]
> Get the events within the box [[bl_lng,bl_lat], [ur_lng, ur_lat]]
