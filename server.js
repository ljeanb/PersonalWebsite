var express = require('express');
var consolidate = require('consolidate');
var bodyparser = require('body-parser');
var app = express();
var Collection = require('./models').Collection;

app.set('views', './templates');
app.engine('html', consolidate.nunjucks);

app.use(express.static('./static'));

app.get('/', function(req, res){
	res.render('index.html');
});

app.use(bodyparser.urlencoded({
	extended : true
}));

app.get('/index', function(req, res){
	Collection.findAll().then(function(results){
		console.log(results);	
		res.render('index.html', {
			cards : results
		});
	})
});

app.get('/anime', function(req, res){
	Collection.findAll({
		where: { type: 'anime' }
	}).then(function(results){
		console.log(results);	
		res.render('anime.html', {
			cards : results
		});
	})

});

app.get('/manga', function(req, res){
	Collection.findAll({
		where: { type: 'manga' }
	}).then(function(results){
		console.log(results);	
		res.render('manga.html', {
			cards : results
		});		
	})
});

app.get('/add', function(req, res){
		res.render('add.html');
});


app.post('/add', function(req, res){
	var title = req.body.name;
	var plot = req.body.plot;
	var type = req.body.type;
	var image = req.body.image;
	
	Collection.create({
		title: title,
		plot: plot,
		type: type,
		image: image
	}).then(function(){
		res.redirect('/add');		
	})
});

app.listen(3000, function(){
 	console.log('Server is now listening at port 3000');
 });