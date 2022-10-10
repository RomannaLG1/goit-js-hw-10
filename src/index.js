import './css/styles.css';

// const DEBOUNCE_DELAY = 300;

fetch('https://restcountries.com/v2/all?fields=name,capital,population,flags,languages')
  .then(response => {
    return response.json();
  })
  .then(countreName => {
    console.log(countreName);
  })
  .catch(error => {
    console.log(error);
  });
