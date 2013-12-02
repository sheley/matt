var log10 = function (x) {
	return Math.log(x) / Math.log(10);
}

	//Antoine Coefficients
var a_ant=5.402;
var b_ant=1838.7;
var c_ant=-31.7;

	//Shift °C to K
CtoK=273.18;


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
function inputValueHumidity() {
	var humidityInput = parseFloat(document.getElementById("humidity").value);
	if (humidityInput < 1 || humidityInput > 100) {
		alert("Is your humidity entry correct?\n\nBe sure to enter humidity as a percent, NOT in decimal form.\n\nThis window appeared because you entered a number lower than 1 or higher than 100.");
		return(humidityInput);
	} else {
		return(humidityInput);
	}
}

function inputValueSampleTemperatureC() {
	return(parseFloat(document.getElementById("sampletemperatureC").value));
}

function inputValueSampleTemperatureK() {
	return(parseFloat(document.getElementById("sampletemperatureK").value));
}


function inputValueBathTemperatureC() {
	return(parseFloat(document.getElementById("bathtemperatureC").value));
}

function inputValueBathTemperatureK() {
	return(parseFloat(document.getElementById("bathtemperatureK").value));
}

//uses the inputted values to calculate answers, round to nearest hundredth
//and insert them into the appropriate solution div
function computeHumidityC() {
	var solution = parseFloat(humidityC(inputValueSampleTemperatureC(), inputValueBathTemperatureC())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('humiditysolution').innerHTML = solution + " %";
	document.getElementById('humidity').value = solution;
	}
}

function computeHumidityK() {
	var solution = parseFloat(humidityK(inputValueSampleTemperatureK(), inputValueBathTemperatureK())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('humiditysolution').innerHTML = solution + " %";
	document.getElementById('humidity').value = solution;
	}
}

function computeSampleTemperatureC() {
	var solution = parseFloat(sampleTemperatureC(inputValueHumidity(), inputValueBathTemperatureC())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('sampletemperaturesolutionC').innerHTML = solution + " °C";
		document.getElementById('sampletemperatureC').value = solution;
	}
}

function computeSampleTemperatureK() {
	var solution = parseFloat(sampleTemperatureK(inputValueHumidity(), inputValueBathTemperatureK())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('sampletemperaturesolutionK').innerHTML = solution + " K";
		document.getElementById('sampletemperatureK').value = solution;
	}
}

function computeBathTemperatureC() {
	var solution = parseFloat(bathTemperatureC(inputValueHumidity(), inputValueSampleTemperatureC())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('bathtemperaturesolutionC').innerHTML = solution +" °C";
	document.getElementById('bathtemperatureC').value = solution;
	}
}

function computeBathTemperatureK() {
	var solution = parseFloat(bathTemperatureK(inputValueHumidity(), inputValueSampleTemperatureK())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('bathtemperaturesolutionK').innerHTML = solution +" K";
	document.getElementById('bathtemperatureK').value = solution;
	}
}

function solvingFor () {
	return document.forms[0].classList[0];
}

//added C and K versions of compute calls.
function solve () {
	if (solvingFor() == 'humidity') {
		computeHumidityC();
		computeHumidityK();
	} else if (solvingFor() == 'sampletemperature') {
		computeSampleTemperatureC();
		computeSampleTemperatureK();
	} else if (solvingFor() == 'bathtemperature') {
		computeBathTemperatureC();
		computeBathTemperatureK();
	}
}

// adding event listener to know that user has entered or changed a value into the field
document.getElementById("sampletemperatureC").addEventListener("change", solve);
document.getElementById("sampletemperatureC").addEventListener("keyup",  solve);
document.getElementById("bathtemperatureC").  addEventListener("change", solve);
document.getElementById("bathtemperatureC").  addEventListener("keyup",  solve);

document.getElementById("sampletemperatureK").addEventListener("change", solve);
document.getElementById("sampletemperatureK").addEventListener("keyup",  solve);
document.getElementById("bathtemperatureK").  addEventListener("change", solve);
document.getElementById("bathtemperatureK").  addEventListener("keyup",  solve);

document.getElementById("humidity").         addEventListener("change", solve);
document.getElementById("humidity").         addEventListener("keyup",  solve);



//turn nodelist into array so we can use .forEach
function radioButtons () {
	return([].slice.call(document.getElementsByName("unknown")));
};


function names () {
	return [ "humidity"
			, "sampletemperature"
			, "bathtemperature"
	]
};

//adds the class to form based on radio button selection by removing classes of all
//and adding back the class of the one selected --we can use this to hide/show
//input fields based on what we are solving for in CSS
function solveFor (name) {
	names().forEach(function (other){
		document.forms[0].classList.remove(other);
	})
	document.forms[0].classList.add(name);
	solve();
}

//listens for changes in radio buttons
radioButtons().forEach(function (radioButton) {
	radioButton.addEventListener("change", function(e){
		solveFor(e.target.value);
	});
});


//convert c to k
var cToK = function(celsiusField) {
	return celsiusField + 273.18;
}

//convert k to c
var kToC = function(kelvinField) {
	return kelvinField - 273.18;
}

var setSampleTemperatureK = function() {
	document.getElementById("sampletemperatureK").value = cToK(document.getElementById("sampletemperatureC").value;

}

var setSampleTemperatureC = function() {
	document.getElementById("sampletemperatureC").value = kToC(document.getElementById("sampletemperatureK").value;
}

var setSampleTemperatureK = function() {

}

var setSampleTemperatureC = function() {

}

// document.getElementById("sampletemperatureC").addEventListener("change", (document.getElementById("sampletemperatureK").value = cToK(document.getElementById("sampletemperatureC").value)));
// document.getElementById("sampletemperatureC").addEventListener("keyup",  (document.getElementById("sampletemperatureK").value = cToK(document.getElementById("sampletemperatureC").value)));

// document.getElementById("bathtemperatureC").  addEventListener("change", (document.getElementById("bathtemperatureK").value = cToK(document.getElementById("bathtemperatureC").value)));
// document.getElementById("bathtemperatureC").  addEventListener("keyup",  (document.getElementById("bathtemperatureK").value = cToK(document.getElementById("bathtemperatureC").value)));

// document.getElementById("sampletemperatureK").addEventListener("change", (document.getElementById("sampletemperatureC").value = kToC(document.getElementById("sampletemperatureK").value)));
// document.getElementById("sampletemperatureK").addEventListener("keyup",  (document.getElementById("sampletemperatureC").value = kToC(document.getElementById("sampletemperatureK").value)));

// document.getElementById("bathtemperatureK").  addEventListener("change", (document.getElementById("bathtemperatureC").value = kToC(document.getElementById("bathtemperatureK").value)));
// document.getElementById("bathtemperatureK").  addEventListener("keyup",  (document.getElementById("bathtemperatureC").value = kToC(document.getElementById("bathtemperatureK").value)));



var mustEqual = function(a, b, testName) {
	if (a == b) {
		console.log("works: " + testName)
	} else {
		console.log("doesn't work: " + testName)
		console.log("  ", a, "doesn't equal", b)
	}
}

test = function () {
	mustEqual(parseFloat(humidityC(25, 10.4694)).toFixed(1), 40, "humidity test C");
	mustEqual(parseFloat(sampleTemperatureC(75, 15)).toFixed(4), 19.5491, "sample temperature test C");
	mustEqual(parseFloat(bathTemperatureC(82.6, 18)).toFixed(1), 15, "sample bath temperature test C");
	mustEqual(parseFloat(humidityK(298.18, 283.65)).toFixed(1), 40, "humidity test K");
	mustEqual(parseFloat(sampleTemperatureK(75, 288.18)).toFixed(2), 292.73, "sample temperature test K");
	mustEqual(parseFloat(bathTemperatureK(82.6, 291.18)).toFixed(2), 288.18, "sample bath temperature test K");
}

