# foodtrack

REST API

>>>> TRUCKS <<<<<
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
[GET http://localhost:3000/api/trucks/593e91758d07370f1de206cb]
> Get a truck
[PUT http://localhost:3000/api/trucks/593e91758d07370f1de206cb]
> Update a truck



>>>> EVENTS <<<<<
[POST http://localhost:3000/api/trucks]
> Add a new truck to db. (day is number 1 (Sunday) and 7 (Saturday))
Body example:
