const WONDERS = [
  "Great Pyramid of Giza",
  "Hanging Gardens of Babylon",
  "Colossus of Rhodes",
  "Pharos of Alexandria",
  "Statue of Zeus at Olympia",
  "Temple of Artemis",
  "Mausoleum at Halicarnassus"
];
const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=`;

const reportStatus = (message) => {
  $('#status-message').html(message);
}

const loadWonders = () => {
  const wondersList = $('#wonder-list');
  wondersList.empty();
  // Call on load status:
  reportStatus('Loading Wonders! Please wait...');
  // get the thing:
  WONDERS.forEach((wonder) => {
    // console.log(URL + encodeURI(wonder));
    axios.get(URL + encodeURI(wonder)) //returns a promisse (newest way to handle a asyncronist thing in JS)
    .then((response) => {
      console.log('This is the .then');
      console.log(response.data.results[0].geometry.location);
      //  get the data from the response and append li's to the DOM:
      // response.data.forEach((wonders) => {
      wondersList.append(`<li> <strong> ${wonder} </strong> <br> <strong> lat: </strong>  ${response.data.results[0].geometry.location.lat} <br> <strong> long </strong> : ${response.data.results[0].geometry.location.lng}</li>`);
      // });
      reportStatus('Wonders Loaded!');
    })
  })
  // if API fails:
  .catch((error) => {
    console.log(error);
    reportStatus(`Error: ${error.message}`);
  });
  console.log('This is after .get');
}
// Load Wonders when the user clicks on the button:
$(document).ready(() => {
  $('#load').click(loadWonders);
})
