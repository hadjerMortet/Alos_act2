//Requirements
var express = require('express')
var logger = require("morgan");
const bodyParser = require('body-parser');
const{ body, validationResult } = require('express-validator');
const Restaurant = require('./db.json')

var app = express()
app.use(logger('dev'));
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///GET ROUTE
app.get('/Restaurant',(req,res) => {
	res.status(200).json(Restaurant)
})
app.get( (req,res) => {
	const id = parseInt(req.params.id)
	const Rest = Restaurant.find(Rest => Rest.id === id)
	if(!Rest) return response.status(404).send("The Restaurant with the provided id does not exist.");
	res.status(200).json(Rest)
})
///POST ROUTE
app.post('/Restaurant',
///Sanitization

body('id').not().isEmpty().trim().escape(),
body('name').not().isEmpty().trim().escape(),
body('address').not().isEmpty().trim().escape(),
body('about').not().isEmpty().trim().escape(),
body('jours d'ouverture').not().isEmpty().trim().escape(),
body('horaires d'ouverture').not().isEmpty().trim().escape(),
body('tel').not().isEmpty().trim().escape(),
body('type de restaurant').not().isEmpty().trim().escape(),

(req, res, next)=> {
	let content = req.body;
	const errors = validationResult(req);
	
// id and name should not be Empty
    if (!content.id && !content.name) {
		return res.status(400).json('le restaurant nest pas ajouter');
	}
	
//verfication
    if (!errors.isEmpty())  {
		return res.status(400).json({
			success: false,
			errors: errors.array()
		});
    }
	res.status(200).json({
		success: true,
		message: 'ajouter avec success' ,
	})
	
});
///PUT ROUTE 
app.put(
        body('name').not().isEmpty().trim().escape(),
		body('address').not().isEmpty().trim().escape(),
		body('about').not().isEmpty().trim().escape(),
		body('jours d'ouverture').not().isEmpty().trim().escape(),
		body('horaires d'ouverture').not().isEmpty().trim().escape(),
		body('tel').not().isEmpty().trim().escape(),
		body('type de restaurant').not().isEmpty().trim().escape(),
		(req,res) => {
		const id = req.params.id
		let Rest = Restaurant.find(Rest => Rest.id === id)
		Rest.name =req.body.name,
		Rest.address = req.body.address,
		Rest.about =req.body.about,
		Rest.joursdouverture =req.body.joursdouverture,
		Rest.horairesdouverture =req.body.horairesdouverture,
		Rest.tel =req.body.tel,
		Rest.typederestaurant =req.body.typederestaurant,
		res.status(200).json(Rest)
		})
		
///DELETE ROUTE 
app.delete( (req,res) => {
	const id = parseInt(req.params.id)
	let Rest = Restaurant.find(Rest => Rest.id === id)
	if(!Rest) return response.status(404).send("Restaurant not found");
	Restaurant.splice(Restaurant.indexOf(Rest),1)
	res.status(200).json(Restaurant)
})

// error msg
app.use((req, res, ,next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})


app.use((error, req, res, next) => {
	
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

app.listen(8080, () => {
	console.log("Serveur listening ")
})
module.exports = app;
		
