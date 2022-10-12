import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import templateCard from './template-card.hbs';
import templateOnlyCountry from './template-country.hbs';
import API from './js/api-servis';

const DEBOUNCE_DELAY = 300;

const listEl = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  evt.preventDefault();

  const searchCountry = inputEl.value;

  API.fetchCountryInfo(searchCountry)
    .then(response => {
      if (response.length > 10) {
        clearListEl();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        if (response.length >= 2 && response.length <= 10) {
          clearListEl();
          renderCountryCard(response);
        } else {
          clearListEl();
          renderCountryCardInfo(response);
        }
      }
    })
    .catch(() => {
      clearListEl();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderCountryCard(country) {
  const markup = templateOnlyCountry(country);
  listEl.innerHTML = markup;
}

function renderCountryCardInfo(country) {
  const markup = templateCard(country);
  listEl.innerHTML = markup;
}

function clearListEl() {
  listEl.innerHTML = '';
}
