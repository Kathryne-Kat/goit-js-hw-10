export const fetchCity = cityName => { 
    const BASE_URL = 'https://restcountries.com/v2/';
    const filters = 'name,capital,population,flags,languages';
    //`https://restcountries.com/v2/name/${cityName}`
    //`${BASE_URL}/name/${cityName}?fields=${filters}`
    return fetch(`${BASE_URL}/name/${cityName}?fields=${filters}`
    ).then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json();
    });
};