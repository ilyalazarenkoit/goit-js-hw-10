import './css/styles.css';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
import {markup, createMarkupListOfCountries, createMarkupOneCountry, tooManyCountries} from './createMarkup';

const input = document.querySelector("#search-box")
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")
const DEBOUNCE_DELAY = 300;



input.addEventListener("input", debounce((event) => {
fetchCountries(event.target.value).then(renderResponse).catch(error => {
    countryList.innerHTML = ""
    countryInfo.innerHTML = ""
    if(event.target.value !== "") {
    Notiflix.Notify.failure("Oops, there is no country with that name")}})
},DEBOUNCE_DELAY))

function renderResponse(resp) {
createMarkupListOfCountries(resp,countryList, countryInfo)
createMarkupOneCountry(resp, countryInfo, countryList)
tooManyCountries(resp)
}
    

