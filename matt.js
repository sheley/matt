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

	//listens for changes in radio buttons
radioButtons().forEach(function (radioButton) {
	radioButton.addEventListener("change", function(e){
		solveFor(e.target.value);
	});
});


//turn nodelist into array so we can use .forEach
function radioButtons () {
	return([].slice.call(document.getElementsByName("unknown")));
};

//adds the class to form based on radio button selection by removing classes of all
//and adding back the class of the one selected --we can use this to hide/show
//input fields based on what we are solving for in CSS
function names () {
	return [ "humidity"
			, "sampletemperature"
			, "bathtemperature"
	]
};

function solveFor (name) {
	names().forEach(function (other){
		document.forms[0].classList.remove(other);
	})
	document.forms[0].classList.add(name);
	solve();
}

function solvingFor () {
	return document.forms[0].classList[0];
}


function solve () {
	if (solvingFor() == 'humidity') {
		computeHumidity()
	} else if (solvingFor() == 'sampletemperature') {
		computeSampleTemperature()
	} else if (solvingFor() == 'bathtemperature') {
		computeBathTemperature()
	}
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

function inputValueSampleTemperature() {
	return(parseFloat(document.getElementById("sampletemperature").value));
}

function inputValueBathTemperature() {
	return(parseFloat(document.getElementById("bathtemperature").value));
}

function inputValueSampleTemperatureK() {
	return(parseFloat(document.getElementById("sampletemperatureK").value));
}

function inputValueBathTemperatureK() {
	return(parseFloat(document.getElementById("bathtemperatureK").value));
}



//equations to solve for the answers
var humidity = function (sampTemp, bathTemp) {
    	return(100 * Math.pow(10, (-b_ant/(bathTemp+c_ant)+b_ant/(sampTemp+c_ant))));
}

var sampleTemperature = function(relHum, bathTemp) {
    	relHumE=relHum/100;
    	return(-c_ant+b_ant/(b_ant/(bathTemp+c_ant)+(log10(relHumE)))-CtoK);
}

var bathTemperature = function(relHum, sampTemp){
    	relHumE=relHum/100;
    	return(-c_ant+b_ant/(b_ant/(sampTemp+c_ant)-(log10(relHumE)))-CtoK);
}

//uses the inputted values to calculate answers, round to nearest hundredth
//and insert them into the appropriate solution div
function computeHumidity() {
	var solutionC = parseFloat(humidity((inputValueSampleTemperature()+CtoK), (inputValueBathTemperature()+CtoK))).toFixed(2);
	var solutionK = parseFloat(humidity(inputValueSampleTemperatureK(), inputValueBathTemperatureK())).toFixed(2);
	if (solutionC != "NaN" && solutionK != "NaN") {
	document.getElementById('humiditysolution').innerHTML = solutionK + " %";
	document.getElementById('humidity').value = solutionK;
	document.getElementById('humiditysolution').innerHTML = solutionC + " %";
	document.getElementById('humidity').value = solutionC;

	}

}

function computeSampleTemperature() {
	var solutionC = parseFloat((sampleTemperature(inputValueHumidity()+CtoK), (inputValueBathTemperature()+CtoK))).toFixed(2);
	var solutionK = parseFloat(sampleTemperature(inputValueHumidity(), inputValueBathTemperature())).toFixed(2);
	if (solutionC != "NaN" && solutionK != "NaN") {
		document.getElementById('sampletemperaturesolution').innerHTML = solutionC + " °C";
		document.getElementById('sampletemperature').value = solutionC;
		document.getElementById('sampletemperaturesolutionK').innerHTML = solutionK + " K";
		document.getElementById('sampletemperatureK').value = solutionK;
	}
}

function computeBathTemperature() {
	var solutionC = parseFloat((bathTemperature(inputValueHumidity()+CtoK), (inputValueSampleTemperature()+CtoK))).toFixed(2);
	var solutionK = parseFloat(sampleTemperature(inputValueHumidity(), inputValueBathTemperature())).toFixed(2);
	if (solutionC != "NaN" && solutionK != "NaN") {
	document.getElementById('bathtemperaturesolution').innerHTML = solutionC +" °C";
	document.getElementById('bathtemperature').value = solutionC;
	document.getElementById('bathtemperaturesolutionK').innerHTML = solutionK +" K";
	document.getElementById('bathtemperatureK').value = solutionK;
	}
}

var updateAndSolve = function(currentField) {
	var id_string = String(currentField.id)
	if (id_string.indexOf("K") !== -1) {
		document.getElementById(id_string.replace('K', '')).value = currentField.value - CtoK;
	} else {
		document.getElementById(id_string + "K").value = currentField.value + CtoK;
	};
	solve;
}



//adding event listener to know that user has changed (entered) a value into the field
document.getElementById("sampletemperature").addEventListener("change", updateAndSolve(document.getElementById("sampletemperature")));
document.getElementById("sampletemperature").addEventListener("keyup",  updateAndSolve(document.getElementById("sampletemperature")));
document.getElementById("bathtemperature").  addEventListener("change", updateAndSolve(document.getElementById("bathtemperature")));
document.getElementById("bathtemperature").  addEventListener("keyup",  updateAndSolve(document.getElementById("bathtemperature")));
document.getElementById("humidity").         addEventListener("change", solve);
document.getElementById("humidity").         addEventListener("keyup",  solve);
document.getElementById("sampletemperatureK").addEventListener("change", updateAndSolve(document.getElementById("sampletemperatureK")));
document.getElementById("sampletemperatureK").addEventListener("keyup",  updateAndSolve(document.getElementById("sampletemperatureK")));
document.getElementById("bathtemperatureK").  addEventListener("change", updateAndSolve(document.getElementById("bathtemperatureK")));
document.getElementById("bathtemperatureK").  addEventListener("keyup",  updateAndSolve(document.getElementById("bathtemperatureK")));

//tests to see if equations work with example data provided by matt

var mustEqual = function(a, b, testName) {
	if (a == b) {
		console.log("works: " + testName)
	} else {
		console.log("doesn't work: " + testName)
		console.log("  ", a, "doesn't equal", b)
	}
}

test = function () {
	mustEqual(parseFloat(humidity((25+CtoK), (10.4694+CtoK))).toFixed(1), 40, "humidity celsius test");
	mustEqual(parseFloat(sampleTemperature(75, (15+CtoK))).toFixed(4), 19.5491, "sample temperature celsius test");
	mustEqual(parseFloat(bathTemperature(82.6, (18+CtoK))).toFixed(1), 15, "sample bath temperature celsius test");
}
