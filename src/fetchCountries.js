export const fetchCity = cityName => { 
    return fetch(`https://restcountries.com/v2/name/${cityName}`
    ).then(res => {
        //console.log(res);
        if (!res.ok) {
            throw new Error(res.status);
        }
        //console.log(res.json());
        return res.json();
    });
};

//fetchCity(peru)
//,capital,population,flags.svg,lenguages

//console.log();

// fetch(`https://restcountries.com/v2/name/peru`
//     ).then(response => {
//         console.log(response);
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         console.log(response.json());
//         return response.json();
//     });


   // const params = new URLSearchParams({
    //     name.official,
    //     capital,
    //     population,
    //     flags.svg,
    //     lenguages
    // })