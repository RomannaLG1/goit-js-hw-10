import './css/styles.css';
import debounce from 'lodash.debounce';
import templateCard from './templates.hbs';

const DEBOUNCE_DELAY = 300;

const listEl = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');
inputEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(evt) {
  evt.preventDefault();

  fetchCountry().then(renderCountryCard);
}

function renderCountryCard(country) {
  const markup = templateCard(country);
  listEl.innerHTML = markup;
}

function fetchCountry(countryName) {
  countryName = inputEl.value;
  return fetch(
    `https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      return response.json();
    })
   
}
