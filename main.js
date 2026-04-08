import {initialiseMap, highlightCityMap, clearHighlightMap, cities} from './map.js'
import {initialiseRadar, updateCity, resetCity} from './radar.js'
import {initializeScatter, highlightCityScatter, clearHighlightScatter} from './scatter.js'
import { initializePie } from './piechart.js';

let activeCity = null;
let headerHeight = 0;
let footerHeight = 0;
let showSvg = false; // tracks whether #para6 has been reached

const title = document.querySelector(".svg-title")
const infoblock = document.querySelector("#info-block")
const scatterInfoBlock = document.querySelector("#scatter-info-block")

document.addEventListener('DOMContentLoaded', () => {
    headerHeight = document.querySelector('#front-page')?.offsetHeight ?? 0;
    footerHeight = document.querySelector('footer')?.offsetHeight ?? 0;
});

async function initialize() {
    const atl = cities.find(d => d.city === "Atlanta, GA");

    await initialiseMap();
    await initialiseRadar();
    await initializeScatter(atl);
    initializePie();
    updateActiveCity(atl);
}

function setVisibility() {
    const pieWrapper = document.querySelector('.pie-wrapper');
    const svgWrapper = document.querySelector('.svg-wrapper');

    const scrolled = window.scrollY;
    const footerTop = document.querySelector('footer').getBoundingClientRect().top + window.scrollY;

    const inHeader = scrolled < headerHeight;
    const inFooter = scrolled + window.innerHeight * 1.5 >= footerTop + footerHeight;

    if (inHeader || inFooter) {
        // Hide everything in header and footer zones
        pieWrapper.style.opacity = '0';
        pieWrapper.style.visibility = 'hidden';
        svgWrapper.style.opacity = '0';
        svgWrapper.style.visibility = 'hidden';
    } else if (!showSvg) {
        // Before #para6 — show bar-wrapper, hide svg-wrapper
        pieWrapper.style.visibility = 'visible';
        pieWrapper.style.opacity = '1';
        svgWrapper.style.opacity = '0';
        svgWrapper.style.visibility = 'hidden';
    } else if (showSvg){
        // #para6 reached — show svg-wrapper, hide bar-wrapper
        pieWrapper.style.opacity = '0';
        setTimeout(() => { pieWrapper.style.visibility = 'hidden'; }, 100);
        svgWrapper.style.visibility = 'visible';
        svgWrapper.style.opacity = '1';
    }
}

function updateGraphic(classList) {
    if (classList.contains('map')) {
        showSvg = true;
    } else if (classList.contains('pie')) {
        showSvg = false;
    }
    setVisibility();
}

export function updateActiveCity(city) {
    activeCity = city;
    console.log(activeCity)
    if (city === null) {
        clearHighlightMap();
        clearHighlightScatter();
        resetCity();
    } else {
        title.textContent = city.city
        console.log("Active city updated to: " + city.city);
        highlightCityMap(city);
        highlightCityScatter(city);
        updateCity(city.city);
    }
}

window.addEventListener('scroll', setVisibility);

const sections = document.querySelectorAll('.para');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateGraphic(entry.target.classList);
        }
    });
}, { threshold: 0.5 });

sections.forEach(s => observer.observe(s));

initialize();