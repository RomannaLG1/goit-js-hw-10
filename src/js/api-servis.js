const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountryInfo(countryName) {
  return fetch(
    `${BASE_URL}/${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

export default { fetchCountryInfo };
