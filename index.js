const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const prom = fetch(endpoint)  // El metodo .fetch()se utiliza para comunicarte con un servidor(pegarle a una api) de forma asincronica, se utiliza con una funcion callback y devuelve una promesa. 
.then(blob => blob.json())   //.then(data=>data)//.then() Se utiliza para retornar la promesa, tiene un parametro para function callback que se ejecuta cuando la promesa se resuelve bien, y otro para ejecutar el error si la promesa no se cumplio    
.then(blob => cities.push(...blob))                         
//Obtenemos la api.fetch(), si esta la api, la atrapamos con un .then(y los elementos dados los convertimos en un json(otra promesa)) despues .then(los pusheamos en el array.)

function findMatches(wordToMatch, cities){

    return cities.filter(place =>{
         //Averiguamos si la ciudad o estado coincide con lo que se busco.
    
    const regex = new RegExp(wordToMatch, 'gi' )  //G, global, i insensible (coincide con minusculas y mayusculas).  
    return place.city.match(regex) || place.state.match(regex)
    })
    
}        

function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

function displayMatches(){
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(e=>{

     const regex = new RegExp(this.value,'gi');
     const cityName = e.city.replace(regex,`<span class="hl">${this.value}</span>`) /*La palabra que haga match, tambien tiene que ser remplazada con un highlight */
     const stateName = e.state.replace(regex,`<span class="hl">${this.value}</span>`)
        return `<li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(e.population)}</span>
        </li>`;
    }).join('');
    suggestions.innerHTML = html;
}
const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')
searchInput.addEventListener('change', displayMatches) //Dispara al escribir y clickear fuera del input
searchInput.addEventListener('keyup', displayMatches)  //Dispara cuando escribimos en el input.