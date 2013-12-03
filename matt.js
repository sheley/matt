var log10 = function (x) {
	return Math.log(x) / Math.log(10);
}

	//Antoine Coefficients
var a_ant = 5.402;
var b_ant = 1838.7;
var c_ant = -31.7;

	//Shift °C to K
var CtoK = 273.18;

	//solve for humidity
var humidityC = function (sampTempC, bathTempC) {
    	sampTempK=sampTempC+CtoK;
    	bathTempK=bathTempC+CtoK;
    	return(100 * Math.pow(10, (-b_ant/(bathTempK+c_ant)+b_ant/(sampTempK+c_ant))));
}

var humidityK = function (sampTempK, bathTempK) {
   	return(100 * Math.pow(10, (-b_ant/(bathTempK+c_ant)+b_ant/(sampTempK+c_ant))));
}

	//solve for samp temp
var sampleTemperatureC = function(relHum, bathTempC) {
    	relHumE=relHum/100;
    	bathTempK=bathTempC+CtoK;
    	return(-c_ant+b_ant/(b_ant/(bathTempK+c_ant)+(log10(relHumE)))-CtoK);
}

var sampleTemperatureK = function(relHum, bathTempK) {
    	relHumE=relHum/100;
    	return(-c_ant+b_ant/(b_ant/(bathTempK+c_ant)+(log10(relHumE))));
}

	//solve for bath temp
var bathTemperatureC = function(relHum, sampTempC){
    	relHumE=relHum/100;
    	sampTempK=sampTempC+CtoK;
    	return(-c_ant+b_ant/(b_ant/(sampTempK+c_ant)-(log10(relHumE)))-CtoK);
}

var bathTemperatureK = function(relHum, sampTempK){
    	relHumE=relHum/100;
    	return(-c_ant+b_ant/(b_ant/(sampTempK+c_ant)-(log10(relHumE))));
}

//changes the user-inputted values into numbers from strings
//alerts if it appears inputted humidity is in decimal rather than percent
	var inputValueHumidity = function() {
		var humidityInput = parseFloat(document.getElementById("humidity").value);
		if (humidityInput < 1 || humidityInput > 100) {
			alert("Is your humidity entry correct?\n\nBe sure to enter humidity as a percent, NOT in decimal form.\n\nThis window appeared because you entered a number lower than 1 or higher than 100.");
			return(humidityInput);
		} else {
			return(humidityInput);
		}
	}



function inputValueSampleTemperatureC() {
	parseFloat(document.getElementById("sampletemperatureC").value);
}

function inputValueSampleTemperatureK() {
	parseFloat(document.getElementById("sampletemperatureK").value);
}

function inputValueBathTemperatureC() {
	parseFloat(document.getElementById("bathtemperatureC").value);
}

function inputValueBathTemperatureK() {
	parseFloat(document.getElementById("bathtemperatureK").value);
}

var inputValueParsers = function() {
	inputValueHumidity();
	inputValueSampleTemperatureC();
	inputValueSampleTemperatureK();
	inputValueBathTemperatureC();
	inputValueBathTemperatureK();
}


//uses the inputted values to calculate answers, round to nearest hundredth
//and insert them into the appropriate solution div
function computeHumidityC() {
	var solution = parseFloat(humidityC(inputValueSampleTemperatureC(), inputValueBathTemperatureC())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('humidity').value = solution;
		return solution;
	}
}

function computeHumidityK() {
	var solution = parseFloat(humidityK(inputValueSampleTemperatureK(), inputValueBathTemperatureK())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('humidity').value = solution;
		return solution;
	}
}

function computeSampleTemperatureC() {
	var solution = parseFloat(sampleTemperatureC(inputValueHumidity(), inputValueBathTemperatureC())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('sampletemperatureC').value = solution;
		return solution;
	}
}

function computeSampleTemperatureK() {
	var solution = parseFloat(sampleTemperatureK(inputValueHumidity(), inputValueBathTemperatureK())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('sampletemperatureK').value = solution;
		return solution;
	}
}

function computeBathTemperatureC() {
	var solution = parseFloat(bathTemperatureC(inputValueHumidity(), inputValueSampleTemperatureC())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('bathtemperatureC').value = solution;
	return solution;
	}
}

function computeBathTemperatureK() {
	var solution = parseFloat(bathTemperatureK(inputValueHumidity(), inputValueSampleTemperatureK())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('bathtemperatureK').value = solution;
	return solution;
	}
}

var solve = function () {
		computeHumidityC();
		computeHumidityK();
		computeSampleTemperatureC();
		computeSampleTemperatureK();
		computeBathTemperatureC();
		computeBathTemperatureK();
}

// adding event listener to know that user has entered or changed a value into the field
document.getElementById("sampletemperatureC").addEventListener("change", parseAndSolve);
document.getElementById("sampletemperatureC").addEventListener("keyup",  parseAndSolve);
document.getElementById("bathtemperatureC").  addEventListener("change", parseAndSolve);
document.getElementById("bathtemperatureC").  addEventListener("keyup",  parseAndSolve);
document.getElementById("sampletemperatureK").addEventListener("change", parseAndSolve);
document.getElementById("sampletemperatureK").addEventListener("keyup",  parseAndSolve);
document.getElementById("bathtemperatureK").  addEventListener("change", parseAndSolve);
document.getElementById("bathtemperatureK").  addEventListener("keyup",  parseAndSolve);
document.getElementById("humidity").         addEventListener("change", parseAndSolve);
document.getElementById("humidity").         addEventListener("keyup",  parseAndSolve);

//convert c to k
var cToKShift = function(celsiusField) {
	return celsiusField + 273.18;
}

// convert k to c
var kToCShift = function(kelvinField) {
	return kelvinField - 273.18;
}

// var setSampleTemperatureK = function() {
// 	document.getElementById("sampletemperatureK").value
// 	 = cToKShift(document.getElementById("sampletemperatureC").value;
// }

// var setSampleTemperatureC = function() {
// 	document.getElementById("sampletemperatureC").value
// 	= kToCShift(document.getElementById("sampletemperatureK").value;
// }

// var setBathTemperatureK = function() {
// 	document.getElementById("sampletemperatureK").value
// 	 = cToKShift(document.getElementById("sampletemperatureC").value;
// }

// var setBathTemperatureC = function() {
// 	document.getElementById("bathtemperatureC").value
// 	= kToCShift(document.getElementById("bathtemperatureK").value;
// }

var parseAndSolve = function() {
	inputValueParsers;
	solve;
}

var updateAndSolve = function() {
	updateTemperatures;
	solve();
}







// var mustEqual = function(a, b, testName) {
// 	if (a == b) {
// 		console.log("works: " + testName)
// 	} else {
// 		console.log("doesn't work: " + testName)
// 		console.log("  ", a, "doesn't equal", b)
// 	}
// }

// test = function () {
// 	mustEqual(parseFloat(humidityC(25, 10.4694)).toFixed(1), 40, "humidity test C");
// 	mustEqual(parseFloat(sampleTemperatureC(75, 15)).toFixed(4), 19.5491, "sample temperature test C");
// 	mustEqual(parseFloat(bathTemperatureC(82.6, 18)).toFixed(1), 15, "sample bath temperature test C");
// 	mustEqual(parseFloat(humidityK(298.18, 283.65)).toFixed(1), 40, "humidity test K");
// 	mustEqual(parseFloat(sampleTemperatureK(75, 288.18)).toFixed(2), 292.73, "sample temperature test K");
// 	mustEqual(parseFloat(bathTemperatureK(82.6, 291.18)).toFixed(2), 288.18, "sample bath temperature test K");
// }
