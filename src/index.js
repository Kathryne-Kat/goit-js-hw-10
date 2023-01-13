import './css/styles.css';
import { fetchCity } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const refs = {
    countryInputEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryCard: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

function createCountryMarkup(cardInfo) {
    //console.log(cardInfo.length);

    if (cardInfo.length < 10 && cardInfo.length >= 2) {
        const markupList = cardInfo
            .map(({ flags:{svg}, name }) => {
                return `<li style="margin-bottom: 10px">
                            <img src="${svg}" width=40 alt="flag ">  
                            <span style="font-size: 16px; margin-left: 8px">${name}</span>
                        </li>`;
            })
            .join(''); 
        refs.countryCard.innerHTML = '';
        return refs.countryList.innerHTML = markupList;
    }
    
    else if (cardInfo.length < 2) {
        const langName = cardInfo.flatMap(el => el.languages).map(el=>el.name);
    
        const markupCard = cardInfo        
            .map(({ flags:{svg}, name, capital, population }) => {
            return `<div><img src="${svg}" width=40 alt="flag">
                <span style="font-size: 30px; font-weight: 700;">${name}</span></div>
                <p><b>Capital: </b> ${capital}</p>
                <p><b>Population: </b> ${population}</p>
                <p><b>Languages: </b> ${langName}</p>`;
        })
            .join(''); 
        refs.countryList.innerHTML = '';
        return refs.countryCard.innerHTML = markupCard;
    }

    else {
        refs.countryList.innerHTML = '';        
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }       
}   

const onCountryInputEl=(e) =>{
    e.preventDefault();

    const countryName = e.target.value.trim();   

    fetchCity(countryName)
        .then(data => {
            //console.log(data);            
            createCountryMarkup(data)
        })

        .catch(err => {
            console.log(err);
            refs.countryList.innerHTML = ''; 
            refs.countryCard.innerHTML = '';
            if (countryName) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            }           
        });
    //console.log(countryName);
}

refs.countryInputEl.addEventListener('input', debounce(onCountryInputEl, DEBOUNCE_DELAY));