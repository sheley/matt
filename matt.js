//Desired parameters - pick 2 of 3, get answer for third

var log10 = function (x) {
	return Math.log(x) / Math.log(10);
}


	//Antoine Coefficients
var a_ant=5.402;
var b_ant=1838.7;
var c_ant=-31.7;

	//Shift °C to K
CtoK=273.18;


//solve for humidity with entered C
//Changed
//	humidity  --> humidityC
//	sampTemp  --> sampeTempC
//	bathTemp  --> bathTempC
//	bathTempE --> bathTempK
//	sampTempE --> sampTempK
var humidityC = function (sampTempC, bathTempC) {
	//changed sampTempE and bathTempE --> K
    	sampTempK=sampTempC+CtoK;
    	bathTempK=bathTempC+CtoK;
    	return(100 * Math.pow(10, (-b_ant/(bathTempK+c_ant)+b_ant/(sampTempK+c_ant))));
}

//solve for humidity with entered K numbers
//	humidity  --> humidityK
var humidityK = function (sampTempK, bathTempK) {
   	return(100 * Math.pow(10, (-b_ant/(bathTempK+c_ant)+b_ant/(sampTempK+c_ant))));
}




//solve for samp temp with entered C
//Changed
//	sampleTemperature --> sampleTemperatureC
//	bathTemp --> bathTempC
//	bathTempE --> bathTempK
var sampleTemperatureC = function(relHum, bathTempC) {
    	relHumE=relHum/100;
    	bathTempK=bathTempC+CtoK;
    	return(-c_ant+b_ant/(b_ant/(bathTempK+c_ant)+(log10(relHumE)))-CtoK);
}

//solve for samp temp with entered K
//	sampleTemperature --> sampleTemperatureK
var sampleTemperatureK = function(relHum, bathTempK) {
    	relHumE=relHum/100;
    	return(-c_ant+b_ant/(b_ant/(bathTempK+c_ant)+(log10(relHumE))));
}



//solve for bath temp with entered C
//Changed
//	bathTemperature --> bathTemperatureC
//	sampTemp --> sampTempC
//	sampTempE --> sampTempK
var bathTemperatureC = function(relHum, sampTempC){
    	relHumE=relHum/100;
    	sampTempK=sampTempC+CtoK;
    	return(-c_ant+b_ant/(b_ant/(sampTempK+c_ant)-(log10(relHumE)))-CtoK);
}

//solve for bath temp with entered K
//Changed
//	bathTemperature --> bathTemperatureK
//	sampTemp  --> sampTempK
//	sampTempE --> sampTempK
var bathTemperatureK = function(relHum, sampTempK){
    	relHumE=relHum/100;
    	return(-c_ant+b_ant/(b_ant/(sampTempK+c_ant)-(log10(relHumE))));
}



//tests to see if equations work with example data provided by matt

var mustEqual = function(a, b, testName) {
	if (a == b) {
		console.log("works: " + testName)
	} else {
		console.log("doesn't work: " + testName)
		console.log("  ", a, "doesn't equal", b)
	}
}


//added C to name of tests
//added K to name of tests

test = function () {
	mustEqual(parseFloat(humidityC(25, 10.4694)).toFixed(1), 40, "humidity test C");
	mustEqual(parseFloat(sampleTemperatureC(75, 15)).toFixed(4), 19.5491, "sample temperature test C");
	mustEqual(parseFloat(bathTemperatureC(82.6, 18)).toFixed(1), 15, "sample bath temperature test C");
	mustEqual(parseFloat(humidityK(298.18, 283.65)).toFixed(1), 40, "humidity test K");
	mustEqual(parseFloat(sampleTemperatureK(75, 288.18)).toFixed(2), 292.73, "sample temperature test K");
	mustEqual(parseFloat(bathTemperatureK(82.6, 291.18)).toFixed(2), 288.18, "sample bath temperature test K");
}




//changes the user-inputted values into numbers from strings, also
//adds alert to user if it appears they inputted humidity in decimal instead of percent
function inputValueHumidity() {
	var humidityInput = parseFloat(document.getElementById("humidity").value);
	if (humidityInput < 1 || humidityInput > 100) {
		alert("Is your humidity entry correct?\n\nBe sure to enter humidity as a percent, NOT in decimal form.\n\nThis window appeared because you entered a number lower than 1 or higher than 100.");
		return(humidityInput);
	} else {
		return(humidityInput);
	}
}

//inputValueSampleTemperature --> inputValueSampleTemperatureC
//sampletemperature --> sampletemperatureC
function inputValueSampleTemperatureC() {
	return(parseFloat(document.getElementById("sampletemperatureC").value));
}

//inputValueSampleTemperature --> inputValueSampleTemperatureK
//sampletemperature --> sampletemperatureK
function inputValueSampleTemperatureK() {
	return(parseFloat(document.getElementById("sampletemperatureK").value));
}


//inputValueBathTemperature --> inputValueBathTemperatureC
//bathtemperature --> bathtemperatureC
function inputValueBathTemperatureC() {
	return(parseFloat(document.getElementById("bathtemperatureC").value));
}

//inputValueBathTemperature --> inputValueBathTemperatureK
//bathtemperature --> bathtemperatureK
function inputValueBathTemperatureK() {
	return(parseFloat(document.getElementById("bathtemperatureK").value));
}


//uses the inputted values to calculate answers, round to nearest hundredth
//and insert them into the appropriate solution div

//changed
//computeHumidity --> computeHumidityC
//inputValueSampleTemperature --> inputValueSampleTemperatureC
//inputValueBathTemperature --> inputValueBathTemperatureC
function computeHumidityC() {
	//add here and then add style + to .innerHTML
	// var style = '<style="color: red;">'
	// var endStyle = '</style>'
	var solution = parseFloat(humidityC(inputValueSampleTemperatureC(), inputValueBathTemperatureC())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('humiditysolution').innerHTML = solution + " %";
	document.getElementById('humidity').value = solution;
	}
}


//changed
//computeHumidity --> computeHumidityK
//inputValueSampleTemperature --> inputValueSampleTemperatureK
//inputValueBathTemperature --> inputValueBathTemperatureK
function computeHumidityK() {
	//add here and then add style + to .innerHTML
	// var style = '<style="color: red;">'
	// var endStyle = '</style>'
	var solution = parseFloat(humidityK(inputValueSampleTemperatureK(), inputValueBathTemperatureK())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('humiditysolution').innerHTML = solution + " %";
	document.getElementById('humidity').value = solution;
	}
}




//changed
//computeSampleTemperature --> computeSampleTemperatureC
//sampleTemperature --> sampleTemperatureC
//inputValueBathTemperature --> inputValueBathTemperatureC
//sampletemperaturesolution --> sampletemperaturesolutionC
//sampletemperature --> sampletemperatureC
function computeSampleTemperatureC() {
	var solution = parseFloat(sampleTemperatureC(inputValueHumidity(), inputValueBathTemperatureC())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('sampletemperaturesolutionC').innerHTML = solution + " °C";
		document.getElementById('sampletemperatureC').value = solution;
	}
}


//changed
//computeSampleTemperature --> computeSampleTemperatureK
//sampleTemperature --> sampleTemperatureK
//inputValueBathTemperature --> inputValueBathTemperatureK
//sampletemperaturesolution --> sampletemperaturesolutionK
//sampletemperature --> sampletemperatureK
function computeSampleTemperatureK() {
	var solution = parseFloat(sampleTemperatureK(inputValueHumidity(), inputValueBathTemperatureK())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('sampletemperaturesolutionK').innerHTML = solution + " °C";
		document.getElementById('sampletemperatureK').value = solution;
	}
}


//changed
//computeBathTemperature --> computeBathTemperatureC
//bathTemperature --> bathTemperatureC
//inputValueSampleTemperature --> inputValueSampleTemperatureC
//bathtemperaturesolution --> bathtemperaturesolutionC
//bathtemperature --> bathtemperatureC
function computeBathTemperatureC() {
	var solution = parseFloat(bathTemperatureC(inputValueHumidity(), inputValueSampleTemperatureC())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('bathtemperaturesolutionC').innerHTML=
		solution +" °C";
	document.getElementById('bathtemperatureC').value=
		solution;
	}
}


//changed
//computeBathTemperature --> computeBathTemperatureK
//bathTemperature --> bathTemperatureK
//inputValueSampleTemperature --> inputValueSampleTemperatureK
//bathtemperaturesolution --> bathtemperaturesolutionK
//bathtemperature --> bathtemperatureK
function computeBathTemperatureK() {
	var solution = parseFloat(bathTemperatureK(inputValueHumidity(), inputValueSampleTemperatureK())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('bathtemperaturesolutionK').innerHTML=
		solution +" °C";
	document.getElementById('bathtemperatureK').value=
		solution;
	}
}


function solvingFor () {
	return document.forms[0].classList[0];
}



//added C and K versions of compute calls.
//i should be able to leave the class names the same
function solve () {
	if (solvingFor() == 'humidity') {
		computeHumidityC()
		computeHumidityK()
	} else if (solvingFor() == 'sampletemperature') {
		computeSampleTemperatureC();
		computeSampleTemperatureK()
	} else if (solvingFor() == 'bathtemperature') {
		computeBathTemperatureC()
		computeBathTemperatureK()
	}
}

//added C and K event listeners
//adding event listener to know that user has changed (entered) a value into the field
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

