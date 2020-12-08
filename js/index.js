//create an object to hold the api key and its base url or endpoint
const Api = {
  key: 'c5baceba353dd5fe537133798e816c4d',
  endpoint: 'https://api.openweathermap.org/data/2.5/'
}

//create a function to do a fetch and return weather.json to get an http request
function getWeatherInfo (query) {
  fetch(`${Api.endpoint}weather?q=${query}&units=metric&APPID=${Api.key}`)
    .then(weather => {
      console.log(weather.json);
      return weather.json()
    })
    .then(/*function to display search results will be here*/)
}
/*-----------------------------------------------------------------------------
LOCATION*/
function getLocation() {
  /*
  Check if Geolocation is supported
    If supported, run the getCurrentPosition() method. If not, display an error message to the user
    If the getCurrentPosition() method is successful, it returns a coordinates object to the function specified in the parameter (showPosition)
    Finally, the showPosition() function outputs the Latitude and Longitude
  */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    let err = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
/*-----------------------------------------------------------------------------
DATE & TIME*/
function getDateTime() {
  let dateTime = new Date();
  document.getElementById('date').innerHTML = (`${dateTime.toDateString()}`);
  document.getElementById('time').innerHTML = (`${dateTime.toLocaleTimeString()}`);
}
/*-----------------------------------------------------------------------------
MENU ICON*/
function listenForMenuIcon(){
  var menuIcon = document.getElementsByClassName("menu-icon");

  var menuIconFunction = function() {
      document.getElementById("menu-icon-options-id").classList.toggle("show");
  };

  for (let i = 0; i < menuIcon.length; i++) {
      menuIcon[i].addEventListener('click', menuIconFunction);
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.menu-icon')) {
	    var dropdowns = document.getElementsByClassName("menu-icon-options");
	    
	    for (var i = 0; i < dropdowns.length; i++) {
	      var openDropdown = dropdowns[i];
	      if (openDropdown.classList.contains('show')) {
	        openDropdown.classList.remove('show');
	      }
	    }
	  }
  }
}
/*-----------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
//1. Get the device location:
getLocation();
//2. Get the date & time:
getDateTime();
setInterval(getDateTime, 1000);

//3. Get the weather:

//4. Listen for menu Icon Click
listenForMenuIcon();
});
