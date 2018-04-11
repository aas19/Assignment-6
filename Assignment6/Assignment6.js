function CreateCustomer() {
	
	
	
    var objRequest = new XMLHttpRequest();
    //var url = "http://bus-pluto.ed.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";

    //Collect Customer data from the web page
    var customerid = document.getElementById("customerID").value;
    var customername = document.getElementById("customerName").value;
    var customercity = document.getElementById("customerCity").value;
	
	if (customerid === customerid.toUpperCase() && customerid.length == 5 ){
		//Create the parameter string
		var newCustomer = { "CustomerID": customerid, "CompanyName": customername, "City": customercity };
		var newCustomerString = JSON.stringify(newCustomer)

		//Checking for AJAX operation return
		objRequest.onreadystatechange = function () {
			if (objRequest.readyState == 4 && objRequest.status == 200) {
				var result = JSON.parse(objRequest.responseText);
				OperationResult(result);
			}
		}

		//Start AJAX request
		objRequest.open("POST", url, true);
		objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		objRequest.send(newCustomerString);
			
			
	}
	else{
		document.getElementById("result").innerHTML = "Customer ID Must be 5 uppercase characters only."
	}

    

}


function updateOrderAddress() {
    var objRequest = new XMLHttpRequest();
    //var url = "http://bus-pluto.ed.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";

    //Collect Customer data from the web page
    var OrderID = document.getElementById("OrderID").value;
    var ShipAddress = document.getElementById("ShipAddress").value;
    var ShipCity = document.getElementById("ShipCity").value;
    var ShipName = document.getElementById("ShipName").value;
    var ShipPostcode = document.getElementById("ShipPostcode").value;


    //Create the parameter string
    var newAddress = { "OrderID": OrderID, "ShipAddress": ShipAddress, "ShipCity": ShipCity, "ShipName":ShipName,"ShipPostcode":ShipPostcode };
    var newCustomerString = JSON.stringify(newAddress)

    //Checking for AJAX operation return
    objRequest.onreadystatechange = function () {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var result = JSON.parse(objRequest.responseText);
            //console.log(result)
			var errorString = "";
			if (result == 1) {
				document.getElementById("result").innerHTML = "The operation was successful!"
			}
			else if(result == 0){
				errorString = "Operation failed with an unspecified error";
				document.getElementById("result").innerHTML = "The operation was not successul!" + "<br>" + errorString;
				
			}
			else if(result == -2){
				errorString = "Operation failed because the data string supplied could not be deserialized into the service object";
				document.getElementById("result").innerHTML = "The operation was not successul!" + "<br>" + errorString;
			}
			else{
				errorString = "Operation failed because a record with the supplied Order ID could not be found";
				document.getElementById("result").innerHTML = "The operation was not successul!" + "<br>" + errorString;
			}
        }
    }

    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newCustomerString);

}



function deleteCustomer() {
    var objRequest = new XMLHttpRequest();
    //var url = "http://bus-pluto.ed.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";

    //Collect Customer data from the web page
    var CustomerID = document.getElementById("CustomerIDForDelete").value;
    url = url + CustomerID;
	console.log(url);

    

    //Checking for AJAX operation return
    objRequest.onreadystatechange = function () {
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var result = JSON.parse(objRequest.responseText);
            console.log(result.DeleteCustomerResult)
			OperationResult(result.DeleteCustomerResult);
			
        }
    }

    //Start AJAX request
	
    objRequest.open("GET", url, true);
    objRequest.send(null);

}


function OperationResult(output) {
	console.log (output);
	console.log ("Result2="+output.WasSuccessful);
    if (output.WasSuccessful == 1) {
        document.getElementById("result").innerHTML = "The operation was successful!"
    }
    else {
        document.getElementById("result").innerHTML = "The operation was not successul!" + "<br>" + output.Exception;
    }
}