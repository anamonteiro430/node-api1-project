// implement your API here
const express = require('express'); //require the express npm module

const db = require('./data/db.js'); //import

const server = express();

//teaches express how to read JSON from the body
server.use(express.json()); //needed for POST, PUT and PATCH

//callback - request handler function
server.get('/', (req, res) => {
	res.send('Hello');
});

// view a list of users
server.get('/api/users', (req, res) => {
	//get hubs from database
	db.find()
		.then(db => {
			res.status(200).json(db);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'error' });
		});
});

// get specific user
server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;

	db.findById(id)
		.then(user => {
			console.log(user);
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'error' });
		});
});

//create a new user
server.post('/api/users', (req, res) => {
	const usersInfo = req.body;

	console.log('body', req.body);

	db.insert(usersInfo)
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'error' });
		});
});

//delete a user
server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;

	db.remove(id)
		.then(removed => {
			res.status(200).json(removed);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'error' });
		});
});

const port = 5000;
server.listen(port, () => console.log(`\n***API on port ${port} \n`));
