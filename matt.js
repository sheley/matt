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



var humidity = function (sampTemp, bathTemp) {
    	sampTempE=sampTemp+CtoK;
    	bathTempE=bathTemp+CtoK;
    	return(100 * Math.pow(10, (-b_ant/(bathTempE+c_ant)+b_ant/(sampTempE+c_ant))));
}

var sampleTemperature = function(relHum, bathTemp) {
    	relHumE=relHum/100;
    	bathTempE=bathTemp+CtoK;
    	return(-c_ant+b_ant/(b_ant/(bathTempE+c_ant)+(log10(relHumE)))-CtoK);
}

var bathTemperature = function(relHum, sampTemp){
    	relHumE=relHum/100;
    	sampTempE=sampTemp+CtoK;
    	return(-c_ant+b_ant/(b_ant/(sampTempE+c_ant)-(log10(relHumE)))-CtoK);
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

test = function () {
	mustEqual(parseFloat(humidity(25, 10.4694)).toFixed(1), 40, "humidity test");
	mustEqual(parseFloat(sampleTemperature(75, 15)).toFixed(4), 19.5491, "sample temperature test");
	mustEqual(parseFloat(bathTemperature(82.6, 18)).toFixed(1), 15, "sample bath temperature test");
}

//changes the user-inputted values into numbers from strings, also
//adds alert to user if it appears they inputted humidity in decimal instead of percent
function inputValueHumidity() {
	var humidityInput = parseFloat(document.getElementById("humidity").value);
	if (humidityInput < 1 || humidityInput > 100) {
		alert("*ahem* Make sure you enter humidity in % !");
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


//uses the inputted values to calculate answers, round to nearest hundredth
//and insert them into the appropriate solution div


function computeHumidity() {
	var solution = parseFloat(humidity(inputValueSampleTemperature(), inputValueBathTemperature())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('humiditysolution').innerHTML = solution +" %";
	document.getElementById('humidity').value = solution;
	}
}

function computeSampleTemperature() {
	var solution = parseFloat(sampleTemperature(inputValueHumidity(), inputValueBathTemperature())).toFixed(2);
	if (solution != "NaN") {
		document.getElementById('sampletemperaturesolution').innerHTML = solution + " °C";
		document.getElementById('sampletemperature').value = solution;
	}
}

function computeBathTemperature() {
	var solution = parseFloat(bathTemperature(inputValueHumidity(), inputValueSampleTemperature())).toFixed(2);
	if (solution != "NaN") {
	document.getElementById('bathtemperaturesolution').innerHTML=
		solution +" °C";
	document.getElementById('bathtemperature').value=
		solution;
	}
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

//adding event listener to know that user has changed (entered) a value into the field
document.getElementById("sampletemperature").addEventListener("change", solve);
document.getElementById("sampletemperature").addEventListener("keyup",  solve);
document.getElementById("bathtemperature").  addEventListener("change", solve);
document.getElementById("bathtemperature").  addEventListener("keyup",  solve);
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


// //ask user if humidity entered is in percent --- this does not work yet
// document.getElementById("humidity").onBlur

// function validateHumidity() {
// 	if (document.getElementById("humidity").value<1) {
// 		alert("*ahem* Make sure you enter humidity in % !");
//  	}
//  }

//default to have bath temperature selected --- this does not work yet!!!! NOTHING WORKS

// function check() {
//   document.getElementById("bathtemperature").checked=true;
//   }

//  function displayResult()
// {
// var x=document.getElementById("bathtemperature").defaultChecked;
// alert(x);
// }

// document.getElementById("bathtemperature").checked=true|false
// document.getElementById("bathtemperature").checked


//°C
