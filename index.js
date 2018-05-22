const URL = 'http://petdibs.herokuapp.com/pets';

const reportStatus = (message) => {
  $('#status-message').html(message);
}

const loadPets = () => {
  const petList = $('#pet-list');
  petList.empty();

// Call on load status:
reportStatus('Loading Pets! Please wait...');

  // get the thing:
  axios.get(URL) //returns a promisse (newest way to handle a asyncronist thing in JS)
  .then((response) => {
    console.log('This is the .then');
    //  get the data from the response and append li's to the DOM:
    response.data.forEach((pet) => {
      petList.append(`<li>${pet.name}</li>`);
    });
    reportStatus('Pets Loaded!');
  })
  // if API fails:
  .catch((error) => {
    console.log(error);
    reportStatus(`Error: ${error.message}`);
  });

  console.log('This is after .get');
}

// Load Pets when the user clicks on the button:
$(document).ready(() => {
  $('#load').click(loadPets);
})
