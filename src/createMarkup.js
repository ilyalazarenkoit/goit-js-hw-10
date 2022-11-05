import Notiflix from 'notiflix';

let markup;
function createMarkupOneCountry(resp, element1, element2) {
    if(resp.length === 1) {
        markup = `<div class="wrapper"><img class="flag" src="${resp[0].flags.svg}"><h1>${resp[0].name.common}</h1></div><ul class="list"><li class="item one"><h3>Capital: </h3><p>${resp[0].capital}</p></li>
        <li class="item one"><h3>Population: </h3><p>${resp[0].population}</p></li>
        <li class="item one"><h3>Languages: </h3><p>${Object.values(resp[0].languages).join(", ").trim()}</p></li>
        </ul>`
        element1.innerHTML = markup
        element2.innerHTML = ""
     }
}

function createMarkupListOfCountries(resp, element1, element2) {
    if(resp.length > 1 && resp.length < 10) {
        resp.sort((a, b) => a.name.common.localeCompare(b.name.common))
        markup = resp.map(item => `<li class="item"><img class="flag" src="${item.flags.svg}"><p>${item.name.common}</p></li>`).join("")
        element1.innerHTML = markup
        element2.innerHTML = ""
    }
}

function tooManyCountries(resp) {
    if(resp.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return resp
       }
}


export {markup, createMarkupListOfCountries, createMarkupOneCountry, tooManyCountries}