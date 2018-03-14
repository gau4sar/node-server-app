var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

	app.get('/', (req, res) => {
		res.send("Welcome to teqnihome");
	});

	app.get('/user/:id', (req, res) => {
		const id = req.params.id;
		const details = {'_id': new ObjectID(id)};
		db.collection('users').findOne(details, (err, item) => {
			if(err) {
				res.send({'status': 'error', 'error': 'An error has occured'});
			} else {
				res.send({'status': 'ok', 'data': item});
			}
		})
	});

	app.post('/register', (req, res) => {
		
		db.collection('users').findOne({"username": req.body.username}, (err, item) => {
			if(err) {
				res.send({'status':'error', 'message': 'An error has occured'});
			} else {
				if(item != null) {
					res.send({'status':'error', 'message': 'Username already exists'});
				} else {
					const user = { username: req.body.username, password: req.body.password };
					db.collection('users').insert(user, (err, results) => {
						if(err) {
							res.send({'status':'error', 'message': 'An error has occured'});
						} else {
							res.send({'status': 'ok', 'data': results.ops[0]});
						}
					})	
				}
			}
		})
	});

	app.post('/login', (req, res) => {
		const user = { 'username': req.body.username, 'password': req.body.password };
		db.collection('users').findOne(user, (err, item) => {
			if(err) {
				res.send({'status':'error', 'message': 'An error has occured'});
			} else {
				if(item != null) {
					res.send({'status': 'ok', 'data': item});
				} else {
					res.send({'status':'error', 'message': 'Username/password doesn\'t exits.'});
				}
			}
		})
	});


}