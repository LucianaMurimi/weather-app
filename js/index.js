//OPEN WEATHER MAP API
//creating an object to hold the api key and its base url or endpoint
const Api = {
  key: 'c5baceba353dd5fe537133798e816c4d',
  endpoint: 'https://api.openweathermap.org/data/2.5/'
}

// const search = document.getElementById('locationInput');

// //google api for autocomplete location
// let autocomplete;
// function initMap() {
//   autocomplete = new google.maps.places.Autocomplete(  
//     search,
//     {
//       types: ['(cities)'],
//       fields: ['place_id', 'geometry', 'name']
//     });

//     autocomplete.addListener('place_changed', onPlaceChanged);
// }
// function onPlaceChanged() {
//   let place = autocomplete.getPlace();

//   if (!place.geometry) {
//     search.placeholder = 'Enter a place'
//   } else {
//     getWeatherInfo(place.name)
//   }

  
// }

// search.addEventListener('keypress', function (event) {
//   if (event.keyCode == 13) {
//     getWeatherInfo(search.value)
//     //console.log(search.value)
//     search.value = '';
//   }
// } )


// //create a function to do a fetch and return weather.json to get an http request
// function getWeatherInfo (query) {
//   fetch(`${Api.endpoint}weather?q=${query}&units=metric&APPID=${Api.key}`)
//     .then(weather => {
//       console.log(weather.json);
//       return weather.json()
//     })
//     .then(searchResults)
// }

// function searchResults(weather) {
//   console.log(weather);
//   let location = document.getElementById('location');
//   location.innerHTML =  `${weather.name},<br>${weather.sys.country}`;

//   let temp = document.getElementById('temp');
//   temp.innerHTML = `${Math.round(weather.main.temp)} \u00B0C`;

//   let summary = document.getElementById('weather');
//   summary.innerHTML = `${weather.weather[0].description}`
// }

/*-----------------------------------------------------------------------------
WEATHER INFO*/
function fetchWeather(lat, long) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=hourly,daily&appid=${Api.key}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('temp').innerHTML = (`${Math.round(data.current.temp)} \u00B0C`);
      document.getElementById('weather').innerHTML = (`${data.current.weather[0].description}`);
    })
}
/*-----------------------------------------------------------------------------
LOCATION*/
function getLocation() {
  /*
  Check if Geolocation is supported
    If supported, run the getCurrentPosition() method. If not, display an error message to the user
    If the getCurrentPosition() method is successful, it returns a coordinates object to the function specified in the parameter (showPosition)
    Finally, the showLocation() function outputs the Latitude and Longitude
  */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation);
  } else { 
    let err = "Geolocation is not supported by this browser.";
  }
}
function showLocation(position) {
  // console.log(position.coords.latitude);
  // console.log(position.coords.longitude);

  fetch(`http://api.positionstack.com/v1/reverse?access_key=bf46097f2a054dfb423ac19c872c683f&query=${position.coords.latitude},${position.coords.longitude}`)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    document.getElementById('location').innerHTML = (`${data.data[0].name},<br>${data.data[0].country_code}`);
    // getWeatherInfo(data.data[0].region);
    fetchWeather(position.coords.latitude, position.coords.longitude);
  });
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
//1. Get the date & time:
getDateTime();
setInterval(getDateTime, 1000);

//2. Get the device location:
getLocation();

//3. Get the weather: 
// fetchWeather();
// passed as a callback function once the location is determined; so as to pass the the lat and long as parameters

//4. Listen for menu Icon Click
listenForMenuIcon();
});
