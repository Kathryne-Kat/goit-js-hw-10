import './css/styles.css';
import { fetchCity } from './fetchCountries.js';

const refs = {
    cityInputEl: document.querySelector('#search-box'),
    countryMarkup: document.querySelector('.country-list'),
}

//console.log(refs.cityInputEl.elements);
const DEBOUNCE_DELAY = 300;

const onCityInputEl = e => {
    e.preventDefault();

    console.log(e.currentTarget.value);
    const cityName = e.currentTarget.value;

    fetchCity(cityName)
        .then(data => {
            console.log(data);
    
        })
        .catch(response => {
            console.log(err);
        
        });
    console.log(cityName);
};

refs.cityInputEl.addEventListener('input', onCityInputEl);

const criateCountriMarkup = (data) => {
    return `<img src="data." alt="">
<h2>title</h2>
<div>Capital</div>
<div>Population</div>
<div>Languages</div>`
    
}