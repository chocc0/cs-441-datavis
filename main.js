import {initialiseMap, highlightCityMap, clearHighlightMap} from './map.js'
import {initialiseRadar} from './radar.js'
import {initializeScatter} from './scatter.js'

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
    console.log("Active city updated to: " + city.city);
    highlightCityMap(city);
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if(scrolled >= maxScroll){
        document.getElementById('map-wrapper').style.visibility = "visible";
    } else {
        document.getElementById('map-wrapper').style.visibility = "hidden";

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