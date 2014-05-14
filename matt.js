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

function inputValueSampleTemperatureC() {
	return(parseFloat(document.getElementById("sampletemperature").value));
}

function inputValueBathTemperatureC() {
	return(parseFloat(document.getElementById("bathtemperature").value));
}

function inputValueSampleTemperatureK() {
	return(parseFloat(document.getElementById("sampletemperatureK").value));
}

function inputValueBathTemperatureK() {
	return(parseFloat(document.getElementById("bathtemperatureK").value));
}



//uses the inputted values to calculate answers, round to nearest hundredth
//and insert them into the appropriate solution div

State = {
    bathTempC:   null,
    bathTempK:   null,
    sampleTempC: null,
    sampleTempK: null,
    humidity:    null
}

function cloneState (state) {
    return {
        bathTempC:   state.bathTempC,
        bathTempK:   state.bathTempK,
        sampleTempC: state.sampleTempC,
        sampleTempK: state.sampleTempK,
        humidity:    state.humidity
    }
}

function CtoK (c) {
	k = c + 273.18;
    return k;
}

function KtoC (k) {
	c = k - 273.18;
    return c;
}

function change (state, field, value, target) {
    var newState = cloneState(state);

    if (field == "sampleTempC") {
        newState.sampleTempC = value;
        newState.sampleTempK = CtoK(value);
    }
    if (field == "sampleTempK") {
        newState.sampleTempK = value;
        newState.sampleTempC = KtoC(value);
    }
    if (field == "bathTempC") {
        newState.bathTempC = value;
        newState.bathTempK = CtoK(value);
    }
    if (field == "bathTempK") {
        newState.bathTempK = value;
        newState.bathTempC = KtoC(value);
    }
    if (field == "humidity") {
        newState.humidity = value;
    }

    if (target == "humidity")   solveHumidity(newState);
    if (target == "bathTemp")   solveBathTemp(newState);
    if (target == "sampleTemp") solveSampleTemp(newState);

    return newState;
}

var solveHumidity = function() {

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


function listener () {
    // inside of event listener:
    State = change(State, "sampleTempC", 123.0);
    refreshUI(State);
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
	mustEqual(parseFloat(humidity((25+CtoK), (10.4694+CtoK))).toFixed(1), 40, "humidity celsius test");
	mustEqual(parseFloat(sampleTemperature(75, (15+CtoK))).toFixed(4), 19.5491, "sample temperature celsius test");
	mustEqual(parseFloat(bathTemperature(82.6, (18+CtoK))).toFixed(1), 15, "sample bath temperature celsius test");
}
