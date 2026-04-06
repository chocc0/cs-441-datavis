import {initialiseMap} from './map.js'
import {initialiseRadar} from './radar.js'
import {initializeScatter} from './scatter.js'

const maxScroll =  window.visualViewport.height;

function initialize() {
    initialiseMap();
    initialiseRadar();
    initializeScatter();
}

function updateGraphic(s){
    // console.log(s);
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if(scrolled >= maxScroll){
        document.getElementById('test-wrapper').style.visibility = "visible";
    } else {
        document.getElementById('test-wrapper').style.visibility = "hidden";

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