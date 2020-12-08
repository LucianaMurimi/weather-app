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

//TIME
function getDateTime() {
  let dateTime = new Date();
  document.getElementById('date').innerHTML = (`${dateTime.toDateString()}`);
  document.getElementById('time').innerHTML = (`${dateTime.toLocaleTimeString()}`);
}

document.addEventListener('DOMContentLoaded', () => {
//1. Get the device location:
//2. Get the date & time:
getDateTime();
setInterval(getDateTime, 1000);
//3. Get the weather:

});
