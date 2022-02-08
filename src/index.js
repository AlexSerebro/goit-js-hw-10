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

  fetchCountryByName(inputText).then(finalRender).catch(onFetchError);
}
function finalRender(response) {
  clearHtml();
  if (response.length >= 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (response.length > 1) {
    console.log('norm');
    renderCountryList(response);
  }
}

function clearHtml() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderCountryCard(inputText) {
  const marcup = countryCardTpl(inputText);
  console.log('~ marcup', marcup);
  refs.countryInfo.insertAdjacentHTML('beforeend', marcup);
}

function renderCountryList(inputText) {
  console.log(inputText);
  const marcup = countrysListTpl(inputText);
  console.log('~ marcup', marcup);

  refs.countryList.insertAdjacentHTML('beforeend', marcup);
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
