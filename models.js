var Sequelize = require('sequelize');
//var database = require('./database');

var db = new Sequelize('postgres://postgres:jive1234@localhost:5432/lablijin');

var Collection = db.define('collections',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: Sequelize.TEXT,
	plot: Sequelize.TEXT,
	image: Sequelize.TEXT,
	type: Sequelize.TEXT 
},{
	timestamps: false
});

module.exports.Collection = Collection;
db.sync();