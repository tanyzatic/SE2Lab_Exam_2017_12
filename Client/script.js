$(document).ready(function()
{	
	//var baseAddress = "https://polar-coast-16373.herokuapp.com"
	var baseAddress = "http://127.0.0.1:5000"; 
	//post + Json
	$("#btn1").click(function(){
		$.post(baseAddress + "/searchForniture",
		{
			ID: 2
		},
		function(data, status){
			alert(" Status: " + status);
            console.log(data);
		},
		"json");
	});
	
	$("#btn2").click(function(){
		$.post(baseAddress + "/sellFornitures",
		{
			ID: 1
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n quantity: " + data.quantity +
                  "\n price: " + data.price +
                  "\n date: " + data.date +
				  "\n Status: " + status);
		},
		"json");
	});   
    
	$("#btn3").click(function(){
		$.post(baseAddress + "/insertRawElements",
		{
                ID: 4,
                quantity: 2
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n quantity: " + data.quantity +
				  "\n Status: " + status);
		},
		"json");
	});
	
	$("#btn4").click(function(){
		$.post(baseAddress + "/updateFornitures",
		{
			fornitureID: 1,
            forniturePrice: 20 ,
            fornitureQuantity: 50,
            fornitureElements: 
            [
                {
                    ID : 1,
                    quantity : 2
                }
            ]
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
		
	$("#btn5").click(function(){
		$.post(baseAddress + "/updateFornitures",
		{
			fornitureID: 50,
            forniturePrice: 20 ,
            fornitureQuantity: 50,
            fornitureElements: 
            [
                {
                    ID : 1,
                    quantity : 2
                }
            ]
		},
		function(data, status){
			alert("Status: " + status);
            console.log(data);
		},
		"json");
	});
	
});