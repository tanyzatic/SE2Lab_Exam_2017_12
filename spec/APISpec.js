//test of the APIs

//lib for sending requests
var request = require("request");

//set base URL
var base_url = "http://localhost:5000/";

//library for JSON requests
requestJSON = require('request-json');
var client = requestJSON.createClient(base_url);


// Test for homepage
describe("Test /", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

// Test for /showFornitures
describe("Test /showFornitures", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showFornitures/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});

// Test for /showFornitures
describe("Test /showFornitures", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showRawElements/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});



// Test for /searchFornitures
describe("Test /searchFornitures", function() {
    it("returns status code 200", function(done) {
        request.get(
            base_url + "showRawElements/", 
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
    }); 
});





//Test for /sellFornitures
describe("Test /sellFornitures", function() {	
	//legal request
	var data = {
			ID: 2
    };
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "sellFornitures/", data, function(err, res, body) {
		expect(body).toEqual(
			{
                ID: 2,
                price: 30,
                quantity: 4,
                elements : 
                [
                    {
                        ID : 1,
                        quantity : 4
                    },
                    {
                        ID : 3,
                        quantity : 4
                    },
                    {
                        ID : 4,
                        quantity : 500
                    }
                ]
	       }
		);
		done();
	  });
	});
	

	//item non existing ID
	var data1 = {
			ID: 10
    };
	it("to return status code 404", function(done) {
	  client.post(base_url + "sellFornitures/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(404);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1" };
	it("to return status code 406", function(done) {
	  client.post(base_url + "sellFornitures/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});

//Test for /insertRawElements
describe("Test /insertRawElements", function() {	
	//legal request
	var data = {
			ID: 1,
            quantity: 1
    };
    
    var dateCheck= new Date().toISOString();
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "insertRawElements/", data, function(err, res, body) {
		//skip this because of difference in generation of dates
        expect(body).toEqual(
        {
            ID: 1,
            name: "shelf",
            quantity: 21
        });
        //expect(body.ID).toEqual(1);
        //expect(body.price).toEqual(11);
        //expect(body.quantity).toEqual(20);
        //expect(body.genre).toEqual("classic");
		done();
      });
	});
	

	//item non existing ID
	var data1 = {
			ID: 10,
            quantity: 1
    };
	it("to return status code 400", function(done) {
	  client.post(base_url + "insertRawElements/", data1, function(err, res, body) {
		expect(res.statusCode).toBe(400);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1" };
	it("to return status code 406", function(done) {
	  client.post(base_url + "insertRawElements/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});

//Test for /updateFornitures
describe("Test /updateFornitures", function() {	
	//legal request
	var data = {
		fornitureID: 1,
        forniturePrice: 110,
        fornitureQuantity: 2,
		fornitureElements : 
        [
            {
                ID : 1,
                quantity : 2
            },
            {
                ID : 2,
                quantity : 2
            }
        ]
    };
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "updateFornitures/", data, function(err, res, body) {
          expect(res.statusCode).toBe(200);
          expect(body).toEqual(
              {
                ID: 1,
                price: 110,
                quantity: 4,
                elements : 
                [
                    {
                        ID : 1,
                        quantity : 2
                    },
                    {
                        ID : 2,
                        quantity : 2
                    }
                ]
              }
		);
		done();
	  });
	});
	

	//legal request, non existing ID
	var data1 = {
		fornitureID: 10,
        forniturePrice: 110,
        fornitureQuantity: 2,
		fornitureElements : 
        [
            {
                ID : 1,
                quantity : 2
            },
            {
                ID : 2,
                quantity : 2
            }
        ]
    };
    
	it("to return status code 200", function(done) {
	  client.post(base_url + "updateFornitures/", data1, function(err, res, body) {
          expect(res.statusCode).toBe(200);
          expect(body).toEqual(
              {
                ID: 10,
                price: 110,
                quantity: 2,
                elements : 
                [
                    {
                        ID : 1,
                        quantity : 2
                    },
                    {
                        ID : 2,
                        quantity : 2
                    }
                ]
              }
		);
		done();
	  });
	});
	
	//wrong parameter
	var data2 = {code: "1" };
	it("to return status code 406", function(done) {
	  client.post(base_url + "updateFornitures/", data2, function(err, res, body) {
		expect(res.statusCode).toBe(406);
		expect(body).toBe(1);
		done();
	  });
	});	
	
});