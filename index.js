const express = require('express');
const bodyParser = require('body-parser');
const pathToRegexp = require('path-to-regexp');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
let mongodb = null;

app.use(bodyParser.json());
//app.use(cors.json());

app.get('/blabs', (req, res) => {

	/*const thing = items.filter(function (item){
		let x = req.query.createdSince;
		if (x==undefined) x=0;
		return item.postTime>=x;
	});
	*/
	let x = req.query.createdSince;
		if (x==undefined) x=0;
		mongoDb.collection('blabs')
        .find({
        postTime: {$gte: x}
        }).toArray()
        .then(function(item) {
            res.status(200).send(item);
        });

	
    //res.status(200).send(thing);
});

app.post('/blabs', (req, res) => {
    const newItem = {
        name : req.body.author,
        message : req.body.message,
        postTime : Math.floor(Date.now()/1000),
        id : items.length + 1,
    }
    //items.push(newItem);
    //res.status(201).send(newItem);
    mongoDb.collection('blabs')
        .insertOne(newItem)
        .then(function(response) {
            res.status(201).send(newItem);
        });
});
app.delete('/blabs/:blabid', (req, res) => {
	//const regexp = pathToRegexp('/blabs/:blabid', keys);
	
	const id = req.params;
    //console.log(`your server is running on port ${id}`);
	/*items = items.filter(function (i){
       
		return i.id!==parseInt(id.blabid);
	});
	*/
	db.blabs.deleteOne({id: {$eq: id.blabid}});

	res.status(200).send(`deleted blab has id ${id.blabid}`);

});
MongoClient.connect(mongoUrl, function(err, client) {
    if (err)
        throw err;

    console.log("Connected successfully to server");
   
    mongoDb = client.db();

    app.listen(3000, () => {
        console.log('Listening on port 3000');
    });
});
