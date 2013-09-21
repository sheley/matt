//Desired parameters - pick 2 of 3, get answer for third

var log10 = function (x) {
	return Math.log(x) / Math.log(10)
}


	//Antoine Coefficients
var a_ant=5.402;
var b_ant=1838.7;
var c_ant=-31.7;

	//Shift °C to K
CtoK=273.18;

var humidity = function (sampTemp, bathTemp) {
    	sampTempE=sampTemp+CtoK;
    	bathTempE=bathTemp+CtoK;
    	return(100 * Math.pow(10, (-b_ant/(bathTempE+c_ant)+b_ant/(sampTempE+c_ant))));
}

var sampleTemperature = function(relHum, bathTemp) {
    	relHumE=relHum/100;
    	bathTempE=bathTemp+CtoK;
    	return(-c_ant+b_ant/((b_ant/(bathTempE+c_ant))+(log10(relHumE)))-CtoK);
}

var bathTemperature = function(relHum, sampTemp){
    	relHumE=relHum/100;
    	sampTempE=sampTemp+CtoK;
    	return((-c_ant+b_ant/((b_ant/(sampTempE+c_ant))-(log10(relHumE))))-CtoK);
}



var mustEqual = function(a, b, testName) {
	if (a == b) {
		console.log("okay " + testName)
	} else {
		console.log("shit " + testName)
		console.log("  ", a, "doesn't equal", b)
	}
}



test = function () {
	mustEqual(humidity(25, 10.4694), 40, "humidity test");
	mustEqual(sampleTemperature(75, 15), 19.5491, "sample temperature test");
	mustEqual(bathTemperature(82.6, 18), 15, "sample bath temperature test");
}


function inputValueSampleTemp() {
	return(parseFloat(document.getElementById("sampletemperature").value));
}

function inputValueBathTemp() {
	return(parseFloat(document.getElementById("bathtemperature").value));
}


// //adding event listener to know that user has changed (entered) a value into the field
document.getElementById("sampletemperature").addEventListener("change", function(event) {
	console.log(humidity(inputValueSampleTemp(), inputValueBathTemp()));
});

document.getElementById("bathtemperature").addEventListener("change", function(event) {
	console.log(humidity(inputValueSampleTemp(), inputValueBathTemp()));
});



