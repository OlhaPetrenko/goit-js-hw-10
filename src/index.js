import './css/styles.css';
import { fetchCountries } from '../src/fetchCountries';
import { creatCountryMarkup } from '../src/creatMarkup';
import { creatCountriesMarkup } from '../src/creatMarkup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import templDiv from './templates';
// import teplateUl from './template/templateUl.hbs';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryInfoEl = document.querySelector('.country-info');
const countryListEl = document.querySelector('.country-list');
// console.log(countryInfoEl);

inputEl.addEventListener('input', debounce(onInputChangh, 300));

function onInputChangh(event) {
  //   console.log(event.target.value.trim());

  fetchCountries(event.target.value.trim())
    .then(data => {
      console.log(data);
      if (event.target.value.trim() === '') {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        return alert('Відсутня інформація для пошуку');
      }
      if (data.length > 10) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        Notify.info(
          'Забагато позицій знайдено. Будь ласка, введіть назву країни точніше!'
        );
      } else if (data.length > 2 && data.length <= 10) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        const countriesMarkup = creatCountriesMarkup(data);

        // console.log(countriesMarkup);

        countryListEl.insertAdjacentHTML('beforeend', countriesMarkup);
      } else {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        const countryMarkup = creatCountryMarkup(data);

        // console.log(countryMarkup);

        countryInfoEl.insertAdjacentHTML('beforeend', countryMarkup);
      }
    })
    .catch(err => {
      if (err.message === '404') {
        Notify.failure('Упс, немає країни з такою назвою!!!');
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
      }

      console.dir(err);
    });
}
