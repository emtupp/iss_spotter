const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const latitude = JSON.parse(body).lat;
  const longitude = JSON.parse(body).lon;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  fetchMyIP()
  .then(fetchCoordsByIP)
  .catch((error) => {
    console.log("Couldn't fetch coords: ", error.message);
  })
  .then(fetchISSFlyOverTimes)
  .catch((error) => {
    console.log("Couldn't fetch flyover times: ", error.message);
  })
  .then((data) => {
    const { response } = JSON.parse(data);
    console.log(response);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
};

module.exports = { nextISSTimesForMyLocation };