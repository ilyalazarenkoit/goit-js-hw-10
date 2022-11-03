import './css/styles.css';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const input = document.querySelector("#search-box")
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")
const DEBOUNCE_DELAY = 300;
let markup;


input.addEventListener("input", debounce((event) => {
fetchCountries(event.target.value).then(renderResponse).catch(error => {
    countryList.innerHTML = ""
    countryInfo.innerHTML = ""
    if(event.target.value !== "") {
    Notiflix.Notify.failure("Oops, there is no country with that name")}})
},DEBOUNCE_DELAY))

function renderResponse(resp) {
    if(resp.length > 1 && resp.length < 10) {
        resp.sort((a, b) => a.name.common.localeCompare(b.name.common))
        markup = resp.map(item => `<li class="item"><img class="flag" src="${item.flags.svg}"><p>${item.name.common}</p></li>`).join("")
        countryList.innerHTML = markup
        countryInfo.innerHTML = ""
    }else if(resp.length === 1) {
        console.log(Object.values(resp[0].languages));
       markup = `<div class="wrapper"><img class="flag" src="${resp[0].flags.svg}"><h1>${resp[0].name.common}</h1></div><ul class="list"><li class="item one"><h3>Capital: </h3><p>${resp[0].capital}</p></li>
       <li class="item one"><h3>Population: </h3><p>${resp[0].population}</p></li>
       <li class="item one"><h3>Languages: </h3><p>${Object.values(resp[0].languages).join(", ").trim()}</p></li>
       </ul>`
       countryInfo.innerHTML = markup
       countryList.innerHTML = ""
    }else if(resp.length > 10) {
     Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
     return resp
    }
}
    

