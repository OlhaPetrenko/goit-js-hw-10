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

inputEl.addEventListener('input', debounce(onInputChangh, DEBOUNCE_DELAY));

function onInputChangh(event) {
  //   console.log(event.target.value.trim());
  if (event.target.value.trim() === '') {
    Notify.warning('Відсутня інформація для пошуку');
    clearMarkup();
  }
  fetchCountries(event.target.value.trim())
    .then(data => {
      console.log(data);

      if (data.length > 10) {
        clearMarkup();
        Notify.info(
          'Забагато позицій знайдено. Будь ласка, введіть назву країни точніше!'
        );
      } else if (data.length > 2 && data.length <= 10) {
        clearMarkup();
        const countriesMarkup = creatCountriesMarkup(data);
        countryListEl.insertAdjacentHTML('beforeend', countriesMarkup);
      } else {
        clearMarkup();
        const countryMarkup = creatCountryMarkup(data);
        countryInfoEl.insertAdjacentHTML('beforeend', countryMarkup);
      }
    })
    .catch(err => {
      if ((err.message === '404') & (event.target.value.trim() !== '')) {
        Notify.failure('Упс, немає країни з такою назвою!!!');
        clearMarkup();
      }

      console.dir(err);
    });
}

function clearMarkup() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}
