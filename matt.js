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
    	return(-c_ant+b_ant/((b_ant/(bathTempE+c_ant))+(log10(relHumE)))-CtoK);
}

var bathTemperature = function(relHum, sampTemp){
    	relHumE=relHum/100;
    	sampTempE=sampTemp+CtoK;
    	return((-c_ant+b_ant/((b_ant/(sampTempE+c_ant))-(log10(relHumE))))-CtoK);
}

//test stuff

var mustEqual = function(a, b, testName) {
	if (a == b) {
		console.log("works: " + testName)
	} else {
		console.log("doesn't work: " + testName)
		console.log("  ", a, "doesn't equal", b)
	}
}

test = function () {
	mustEqual(humidity(25, 10.4694), 40, "humidity test");
	mustEqual(sampleTemperature(75, 15), 19.5491, "sample temperature test");
	mustEqual(bathTemperature(82.6, 18), 15, "sample bath temperature test");
}

//changes the user-inputted values into numbers from strings
function inputValueHumidity() {
	return(parseFloat(document.getElementById("humidity").value));
}

function inputValueSampleTemperature() {
	return(parseFloat(document.getElementById("sampletemperature").value));
}

function inputValueBathTemperature() {
	return(parseFloat(document.getElementById("bathtemperature").value));
}


//uses the inputted values to calculate answers and insert them into

function computeHumidity() {
	document.getElementById('humiditysolution').innerHTML=
		humidity(inputValueSampleTemperature(), inputValueBathTemperature());
}

function computeSampleTemperature() {
	document.getElementById('sampletemperaturesolution').innerHTML=
		sampleTemperature(inputValueHumidity(), inputValueBathTemperature());
}

function computeBathTemperature() {
	document.getElementById('bathtemperaturesolution').innerHTML=
		bathTemperature(inputValueHumidity(), inputValueSampleTemperature());
}

// //adding event listener to know that user has changed (entered) a value into the field
	//solving for humidity
// document.getElementById("sampletemperature").addEventListener("change", computeHumidity);

// document.getElementById("bathtemperature").addEventListener("change", computeHumidity);



	//solving for sample temperature
document.getElementById("humidity").addEventListener("change", computeSampleTemperature);

document.getElementById("bathtemperature").addEventListener("change", computeSampleTemperature);


	//soliving for bathtemp
document.getElementById("humidity").addEventListener("change", computeBathTemperature);

document.getElementById("sampletemperature").addEventListener("change", computeBathTemperature);




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
//and adding back the class of the one selected

function solveFor (name) {
	names().forEach(function (other){
		document.forms[0].classList.remove(other);
	})
	document.forms[0].classList.add(name);
}

//when a radio button is selected, the matching input field should become hidden and the
//the solution field should be displayed instead

		//I did this in css....//


//listens for changes in radio buttons

radioButtons().forEach(function (radioButton) {
	radioButton.addEventListener("change", function(e){
		solveFor(e.target.value);
	});
});



//inserts solution to HTML file

document.getElementById("sampletemperature").addEventListener("change", computeHumidity);

document.getElementById("bathtemperature").addEventListener("change", computeHumidity);

// document.getElementById("sampletemperature").addEventListener("change", insertSolution);

// document.getElementById("bathtemperature").addEventListener("change", insertSolution);


// function insertSolution () {
//     document.getElementById('humiditysolution').innerHTML=computeHumidity();
// }





