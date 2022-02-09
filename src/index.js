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

function onSearch(event) {
  let inputText = refs.inputRefs.value.trim();
  if (!inputText) {
    return;
  }
  fetchCountryByName(inputText).then(finalRender).catch(onFetchError);
}

function finalRender(response) {
  clearHtml();
  if (!response.length) {
    onFetchError();
  }
  if (response.length >= 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (response.length > 1 && response.length <= 10) {
    // console.log('norm');
    renderCountryList(response);
  } else if (response.length === 1) {
    renderCountryCard(response);
  }
}

function clearHtml() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderCountryCard(inputText) {
  const marcup = countryCardTpl(inputText);
  // console.log('~ marcup', marcup);
  refs.countryInfo.insertAdjacentHTML('beforeend', marcup);
}

function renderCountryList(inputText) {
  console.log(inputText);
  const marcup = countrysListTpl(inputText);
  // console.log('~ marcup', marcup);

  refs.countryList.insertAdjacentHTML('beforeend', marcup);
}

function onFetchError() {
  // console.log('hhh');
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
