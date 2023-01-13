export const fetchCountry = countryName => { 

    const BASE_URL = 'https://restcountries.com/v2/';
    const filters = 'name,capital,population,flags,languages';

    return fetch(`${BASE_URL}/name/${countryName}?fields=${filters}`
    ).then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json();
    });
};