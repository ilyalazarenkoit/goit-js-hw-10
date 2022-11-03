function fetchCountries(country) {
    return fetch(`https://restcountries.com/v3.1/name/${country.trim()}?fields=name,capital,population,flags,languages`).then(resp => {
    if(!resp.ok){
        throw new Error(error)
    }
    return resp.json()
    }).catch(error => console.log(error))
    }

export default fetchCountries;

