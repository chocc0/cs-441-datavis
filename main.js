import {initialiseMap, highlightCityMap, clearHighlightMap, highlightCitiesMap, cities} from './map.js'
import {initialiseRadar, updateCity, resetCity} from './radar.js'
import {initializeScatter, highlightCityScatter, clearHighlightScatter} from './scatter.js'

let activeCity = null;
let activeHighlightGroup = null; // tracks which highlight-data group is active
let headerHeight = 0;
let footerHeight = 0;
let showSvg = false; // tracks whether #para6 has been reached

const title = document.querySelector(".svg-title")
const infoblock = document.querySelector("#info-block")
const scatterInfoBlock = document.querySelector("#scatter-info-block")

// --- Highlight-data city groups ---
// Each entry maps a highlight-data element (by its text content substring) to a list of cities
const HIGHLIGHT_GROUPS = [
  {
    // para2: Flint cardiovascular mortality
    match: "50% higher cardiovascular mortality",
    cities: ["Flint, MI"],
    label: "Flint, MI — 50% higher cardiovascular mortality rate than the national average"
  },
  {
    // para9 (rurality): rural areas with higher cardiovascular mortality
    match: "rural areas (between 3-10% rurality)",
    cities: ["Clarksville, TN", "Chesapeake, VA", "Apple Valley, CA", "Brookhaven, NY", "Albany, GA", "Billings, MT"],
    label: "Clarksville, TN, Chesapeake, VA, Apple Valley, CA, Brookhaven, NY, Albany, GA, Billings, MT"
  },
  {
    // para9 (Atlanta graduation): Black and Hispanic students 13% lower graduation
    match: "Black and Hispanic students experience a 13%",
    cities: ["Atlanta, GA"],
    label: "Atlanta, GA"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    headerHeight = document.querySelector('#front-page')?.offsetHeight ?? 0;
    footerHeight = document.querySelector('footer')?.offsetHeight ?? 0;
    setupHighlightDataClicks();
});

function setupHighlightDataClicks() {
    const highlightEls = document.querySelectorAll('.highlight-data');
    highlightEls.forEach(el => {
        // Find matching group by text content
        const group = HIGHLIGHT_GROUPS.find(g => el.textContent.includes(g.match));
        if (!group) return;

        el.style.cursor = 'pointer';
        el.title = 'Click to highlight cities on map';

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeHighlightGroup === group) {
                // Toggle off
                activeHighlightGroup = null;
                el.classList.remove('highlight-data-active');
                clearHighlightGroup();
            } else {
                // Deactivate any previously active highlight
                document.querySelectorAll('.highlight-data-active')
                    .forEach(a => a.classList.remove('highlight-data-active'));
                activeHighlightGroup = group;
                el.classList.add('highlight-data-active');
                activateHighlightGroup(group);
            }
        });
    });

    // Clicking elsewhere clears the group highlight
    document.addEventListener('click', () => {
        if (activeHighlightGroup) {
            activeHighlightGroup = null;
            document.querySelectorAll('.highlight-data-active')
                .forEach(a => a.classList.remove('highlight-data-active'));
            clearHighlightGroup();
        }
    });
}

function activateHighlightGroup(group) {
    // Clear any single-city active state
    activeCity = null;
    clearHighlightScatter();
    resetCity();

    highlightCitiesMap(group.cities);

    // Update the title to show the group label
    if (title) title.textContent = group.label;

    // Show the city list in info-block
    if (infoblock) {
        infoblock.classList.add('active');
        document.getElementById('city-label').textContent = group.cities.join(' · ');
        document.getElementById('co2-label').textContent = '';
        document.getElementById('poc-label').textContent = '';
        document.getElementById('ozone-label').textContent = '';
        document.getElementById('cardio-label').textContent = '';
    }
}

function clearHighlightGroup() {
    clearHighlightMap();
    if (infoblock) infoblock.classList.remove('active');
    if (title) title.textContent = '';
}


async function initialize() {
    const atl = cities.find(d => d.city === "Atlanta, GA");

    await initialiseMap();
    await initialiseRadar();
    await initializeScatter(atl);

    updateActiveCity(atl);
}

function setVisibility() {
    const barWrapper = document.querySelector('.bar-wrapper');
    const svgWrapper = document.querySelector('.svg-wrapper');

    const scrolled = window.scrollY;
    const footerTop = document.querySelector('footer').getBoundingClientRect().top + window.scrollY;

    const inHeader = scrolled < headerHeight;
    const inFooter = scrolled + window.innerHeight * 1.5 >= footerTop + footerHeight;

    if (inHeader || inFooter) {
        // Hide everything in header and footer zones
        barWrapper.style.opacity = '0';
        barWrapper.style.visibility = 'hidden';
        svgWrapper.style.opacity = '0';
        svgWrapper.style.visibility = 'hidden';
    } else if (!showSvg) {
        // Before #para6 — show bar-wrapper, hide svg-wrapper
        barWrapper.style.visibility = 'visible';
        barWrapper.style.opacity = '1';
        svgWrapper.style.opacity = '0';
        svgWrapper.style.visibility = 'hidden';
    } else if (showSvg){
        // #para6 reached — show svg-wrapper, hide bar-wrapper
        barWrapper.style.opacity = '0';
        setTimeout(() => { barWrapper.style.visibility = 'hidden'; }, 100);
        svgWrapper.style.visibility = 'visible';
        svgWrapper.style.opacity = '1';
    }
}

function updateGraphic(classList) {
    if (classList.contains('map')) {
        showSvg = true;
    } else if (classList.contains('bar')) {
        showSvg = false;
    }
    setVisibility();
}

export function updateActiveCity(city) {
    activeCity = city;
    // Clear any highlight-data group when a city is manually selected
    if (activeHighlightGroup) {
        activeHighlightGroup = null;
        document.querySelectorAll('.highlight-data-active')
            .forEach(a => a.classList.remove('highlight-data-active'));
    }
    console.log(activeCity)
    if (city === null) {
        clearHighlightMap();
        clearHighlightScatter();
        resetCity();
        if (infoblock) infoblock.classList.remove('active');
    } else {
        title.textContent = city.city
        console.log("Active city updated to: " + city.city);
        highlightCityMap(city);
        highlightCityScatter(city);
        updateCity(city.city);
        if (infoblock) infoblock.classList.add('active');
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