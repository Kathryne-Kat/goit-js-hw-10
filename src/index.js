import './css/styles.css';
import { fetchCity } from './fetchCountries.js';
import Notiflix from 'notiflix';
//import { debounce } from 'lodash';
//import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

const refs = {
    cityInputEl: document.querySelector('#search-box'),
    countryCard: document.querySelector('.country-list'),
}

//console.log(refs.cityInputEl.elements);
const DEBOUNCE_DELAY = 300;

function createCountryMarkup(cardInfo) {
    console.log(cardInfo.length );
    if (cardInfo.length < 2) {
    const langName = cardInfo.flatMap(el => el.languages)
        .map(len=>len.name);
    //console.log(langName);
    return cardInfo        
        .flatMap(({ flag, name, capital, population, languages }) => {
            return `<li><div><img src="${flag}" width=40 alt="flag">
                <span style="font-size: 30px; font-weight: 700;">${name}</span></div>
                <div><b>Capital:</b> ${capital}</div>
                <div><b>Population:</b> ${population}</div>
                <div><b>Languages:</b> ${langName}</div></li>`;
        })
            .join(''); 
        
}
    else if (cardInfo.length < 10 && cardInfo.length >= 2) {
        return cardInfo        
        .flatMap(({ flag, name }) => {
            return `<li><div><img src="${flag}" width=30 alt="flag">
                <span style="font-size: 16px; font-weight: 400;">${name}</span></div>
                `;
        })
            .join(''); 
    }
    else {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
       
}   
//console.log(createCountryMarkup);
function onCityInputEl(e) {
    e.preventDefault();

    //console.log(e.currentTarget.value);
    const cityName = e.currentTarget.value.trim();

    fetchCity(cityName)
        .then(data => {
            console.log(data);
            refs.countryCard.innerHTML = createCountryMarkup(data);
        })
        .catch(err => {
            console.log(err);
            Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    console.log(cityName);
}

refs.cityInputEl.addEventListener('input', onCityInputEl);

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');