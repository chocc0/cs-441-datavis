import {initialiseMap, highlightCityMap, clearHighlightMap} from './map.js'
import {initialiseRadar} from './radar.js'
import {initializeScatter, highlightCityScatter, clearHighlightScatter} from './scatter.js'

const maxScroll =  window.visualViewport.height;

let activeCity = null;

function initialize() {
    initialiseMap();
    initialiseRadar();
    initializeScatter();
}

function updateGraphic(s){
    // console.log(s);
}

export function updateActiveCity(city) {
    activeCity = city;
    if (city === null) {
        clearHighlightMap();
        clearHighlightScatter();
    }
    else {
        console.log("Active city updated to: " + city.city);
        highlightCityMap(city);
        highlightCityScatter(city);
    }
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if(scrolled >= maxScroll){
        document.querySelector('.scatterplot-wrapper').style.visibility = "visible";
        document.querySelector('.map-wrapper').style.visibility = "visible";
    } else {
        document.querySelector('.scatterplot-wrapper').style.visibility = "hidden";
        document.querySelector('.map-wrapper').style.visibility = "hidden";
    }
});

const sections = document.querySelectorAll('.para');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const state = entry.target.classList;
      updateGraphic(state); // your update function
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));

initialize();