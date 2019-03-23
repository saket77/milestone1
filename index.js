const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let items = [];

app.get('/blabs', (req, res) => {

	const thing = items.filter(function (item){
		let x = req.query.createdSince;
		if (x==undefined) x=0;
		return item.postTime>=x;
	});

	
    res.status(200).send(thing);
});

app.post('/blabs', (req, res) => {
    const newItem = {
        name : req.body.author,
        message : req.body.message,
        postTime : Math.floor(Date.now()/1000),
        id : items.length + 1,
    }
    items.push(newItem);
    res.status(201).send(newItem);
    
});
app.delete('/blabs/:blabid', (req, res) => {
	const id = req.id;

	items = items.filter(function (item){
		return items.id!==id;
	});
	res.status(200).send('blabs are fun');

});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});