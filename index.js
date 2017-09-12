//express lib
var express = require('express');
//general lib
var app = express();
//inspect
var util = require('util');
//Cross-Origin Resource Sharing (CORS), used for enabling pre-flight option
cors = require('cors');

//record shop manager
var fornitureWarehouse = require('./fornitureWarehouse.js');

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));//set to true since we want to parse nested objects in the JSON we receive
app.use(bodyParser.json());// JSON

//set up the server
app.set('port', (process.env.PORT || 5000));
//enable pre-flight authorization
app.options('*', cors());

/**
 * @brief returns a static welcome page.
 * @return a static page.
 */
app.get('/', function(request, response) {
	var headers = {};
	//answer
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end("Welcome dear customer");
});

/**
 * @brief returns the content of fornitures
 * @return a static page.
 */
app.get('/showFornitures', function(request, response) 
{
	var headers = {};
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end(JSON.stringify(fornitureWarehouse.getFornitures()));
});

/**
 * @brief returns the content of raw materials
 * @return a static page.
 */
app.get('/showRawElements', function(request, response) 
{
	var headers = {};
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end(JSON.stringify(fornitureWarehouse.getRawElements()));
});

/**
 * @brief search for a forniture
 * @return a forniture that matches the ID specified , if not fund it returns 404
 */
app.post('/searchForniture', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var fornitureID;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
        
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
			 fornitureID = parseFloat(request.body.ID);
		else 
			fornitureID = null;
	}
	else
	{
		fornitureID = null;
	}
    
    
    if (fornitureID!=null)
	{
        //search for disk
		var forniture = fornitureWarehouse.searchForniture(fornitureID);
        
		//if exists
		if (forniture != null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(forniture));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}
    }
    else
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}
    

});

/**
 * @brief sell fornitures, decreases the warehouse by 1 element
 * @return the sold item, identified by ID. 
 */
app.post('/sellFornitures', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var fornitureID;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
        //diskID
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
			 fornitureID = parseInt(request.body.ID);
		else 
			fornitureID = null; 
	
	}
	else
	{
		fornitureID = null;
	}
    
	var fornitureSold;
	
    if (fornitureID!=null)
	{
		//aceptable input
		fornitureSold = fornitureWarehouse.sellForniture(fornitureID);
		if (fornitureSold!= null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(fornitureSold));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}

	}
    else    
		{
        	//unaceptable input
        	response.writeHead(406, headers);
			response.end(JSON.stringify("1"));
		}   

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});