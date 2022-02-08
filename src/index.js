import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountryByName } from './js/api-service';
import getrefs from './js/refs';
import countryCardTpl from './templates/country-card.hbs';
import countrysListTpl from './templates/countrys-list.hbs';

const DEBOUNCE_DELAY = 300;

const refs = getrefs();

refs.inputRefs.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  let inputText = refs.inputRefs.value.trim();
  console.log('~ inputText', inputText);
}

function renderCountryCard(inputText) {
  const marcup = countryCardTpl(inputText);
  // console.log('~ marcup', marcup);
  refs.countryInfo.innerHTML = marcup;
}

function renderCountryCard(inputText) {
  const marcup = countrysListTpl(inputText);
  refs.countryList.innerHTML = marcup;
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
