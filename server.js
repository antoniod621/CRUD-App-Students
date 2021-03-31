const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb+srv://Starwars:iDontLike@cluster0.57ch8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
useUnifiedTopology: true})
	.then(client => {
		console.log('Connected to Database')
		const db = client.db('star-wars-quotes')
		const quotesCollection = db.collection('quotes')

		// =========
		// Midlewares
		// ==========
		app.use(express.static('public'))
		app.use(bodyParser.json())
		app.set('view engine', 'ejs')
		app.use(bodyParser.urlencoded({ extended: true }))

		// Set up server
		app.listen(3000, function(){
			console.log('listening on 3000')
		})

		// =========
		// Routes
		// =========

		// C - Create
		app.post('/quotes', (req, res) => {
			quotesCollection.insertOne(req.body)
			.then(result => {
				res.redirect('/')
			})
			.catch(error => console.error(error))
		})

		// R - Read
		app.get('/', (req, res) =>{
			db.collection('quotes').find().toArray()
			.then(results => {
				res.render('index.ejs', {quotes: results})
			})
			.catch(error => console.error(error))
		})

		// U - Update
		app.put('/quotes', (req, res) => {
		quotesCollection.findOneAndUpdate(
			{
				name: res.body.name,
				quote: res.body.quote
			 },
			{
				$set: {
					name: req.body.name,
					quote: req.body.quote
				}
			},
			{
				upsert: true
			}
		)
			.then(result => {res.json('Success')})
			.catch(error => console.error(error))
		})

		// D - Delete
		app.delete('/quotes', (req,res) => {
			quotesCollection.deleteOne()(
				{name: req.body.name}
			)
				.then(result => {
					if (result.deletedCount === 0){
						return res.json('No student to delete')
					}
					res.json('Deleted student')
				})
				.catch(error => console.error(error))
		})
	})
	.catch(console.error)


