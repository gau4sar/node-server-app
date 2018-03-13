var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

	app.get('/', (req, res) => {
		res.send("Welcome to teqnihome heroku app");
	});

	app.get('/user/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id)};
		db.collection('users').findOne(details, (err, item) => {
			if(err) {
				res.send({ 'error': 'An error has occured'});
			} else {
				res.send(item);
			}
		})
	});

	app.post('/register', (req, res) => {
		
		if(db.collection('users').find({'username': {$eq : req.body.username}})){
			res.send({ 'error': 'Username already exists.'});
		} else {
			const user = { username: req.body.username, password: req.body.password };
			db.collection('users').insert(user, (err, results) => {
				if(err) {
					res.send({ 'error': 'An error has occured'});
				} else {
					res.send(results.ops[0]);
				}
			})	
		}
	});

	app.post('/login', (req, res) => {
		const user = { 'username': req.body.username, 'password': req.body.password };
		db.collection('users').findOne(user, (err, item) => {
			if(err) {
				res.send({ 'error': 'An error has occured.'});
			} else {
				if(item != null) {
					res.send(item);
				} else {
					res.send({'error': 'Username/password doesn\'t exits.'});
				}
			}
		})
	});


}