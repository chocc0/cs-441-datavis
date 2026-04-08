import { updateActiveCity } from './main.js';

let scattersvg = d3.select("#scatter-svg");
let chart, xScale, yScale, chartWidth, chartHeight;
let scatterData = [];

// Responsive dimensions will be computed from the SVG bounding box / viewBox

let activeCity = null;

function initalizeSVG()
{
    scattersvg.selectAll("*").remove();

    // Compute available size from CSS/layout; enforce a minimum scale
    const bbox = scattersvg.node().getBoundingClientRect();
    const MIN_WIDTH = 800;
    const MIN_HEIGHT = 500; // 4:3 fallback
    const width = Math.max(MIN_WIDTH, Math.round(bbox.width) || MIN_WIDTH);
    const height = Math.max(MIN_HEIGHT, Math.round(bbox.height) || Math.round(width * 0.75));

    // Scale factor relative to the design target (400x400)
    const scale = Math.max(0.8, Math.min(2, Math.min(width / 400, height / 400)));
    scattersvg.node().__scatter_scale = scale;

    // Set viewBox so the SVG scales responsively while we work in pixel units
    scattersvg.attr('viewBox', `0 0 ${width} ${height}`)
              .attr('preserveAspectRatio', 'xMidYMid meet');

    const margin = { top: 50, right: 10, bottom: 60, left: 80 };
    chartWidth = width - margin.left - margin.right;
    chartHeight = height - margin.top - margin.bottom;

    chart = scattersvg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale = d3.scaleLinear()
        .domain([])
        .range([0, chartWidth]);

    yScale = d3.scaleLinear()
        .domain([])
        .nice()
        .range([chartHeight, 0]);

    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(xScale));

    chart.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale));
    
    chart.append("text")
        .attr("class", "x-label")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 50)
        .attr("text-anchor", "middle")
        .style("font-size", `${Math.max(100, Math.round(20 * scale))}px`)
        .style("fill", "black")
        .text("");

    chart.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", -55)
        .attr("text-anchor", "middle")
        .style("font-size", `${Math.max(100, Math.round(50 * scale))}px`)
        .style("fill", "black")
        .text("");

    
}

const hovering = document.getElementById("scatter-info-block");

function showInfo(event, d)
{
    hovering.style.display = "block";
    hovering.style.opacity = 1;
    hovering.style.left = (event.clientX + 10) + "px";
    hovering.style.top = (event.clientY) + "px";
    document.getElementById("city-labelScatter").textContent = d.city;
    document.getElementById("pollution-label").textContent = d['Air Pollution - Ozone_Total 2021'];
    document.getElementById("death-label").textContent = d['Cardiovascular Disease Deaths_2021_Total\r'];
}

function moveInfo(event) {
    hovering.style.left = (event.clientX + 10) + "px";
    hovering.style.top = (event.clientY) + "px";
}

function hideInfo()
{
    hovering.style.display = "none";
}


function updateCity(event, d)
{
    event.stopPropagation();
    if (activeCity === d.city) {
        activeCity = null;
        updateActiveCity(null);
    } else {
        activeCity = d.city;
        updateActiveCity(d);
    }
}

export function highlightCityScatter(city)
{
    if (!chart) return; 
    chart.selectAll(".dot")
        .attr("opacity", d => d.city === city.city ? 1.0 : 0.2)
        .attr("stroke", d => d.city === city.city ? "#ffffff" : "rgba(0,0,0,0.4)")
        .attr("stroke-width", d => d.city === city.city ? 3 : 0.5)
        .attr("r", d => d.city === city.city ? 12 : 10);
}

export function clearHighlightScatter()
{
    if (!chart) return;
    activeCity = null;
    chart.selectAll(".dot")
        .attr("opacity", 0.7)
        .attr("stroke", "rgba(0,0,0,0.4)")
        .attr("stroke-width", 0.5)
        .attr("r", 10);
}

function updateScatterPlot(data, title = "")
{
    const scale = scattersvg.node().__scatter_scale || 1;
    xScale.domain([d3.min(data, d => d['Air Pollution - Ozone_Total 2021']) -50, d3.max(data, d => d['Air Pollution - Ozone_Total 2021'])]).nice();
    yScale.domain([0, d3.max(data, d => +d['Cardiovascular Disease Deaths_2021_Total\r'])]).nice();

    // Regression line calculation
    const xMean = d3.mean(data, d => +d['Air Pollution - Ozone_Total 2021']);
    const yMean = d3.mean(data, d => +d['Cardiovascular Disease Deaths_2021_Total\r']);
    const slope = d3.sum(data, d => (+d['Air Pollution - Ozone_Total 2021'] - xMean) * (+d['Cardiovascular Disease Deaths_2021_Total\r'] - yMean))
                / d3.sum(data, d => Math.pow(+d['Air Pollution - Ozone_Total 2021'] - xMean, 2));
    const intercept = yMean - slope * xMean;

    const xMin = d3.min(data, d => d['Air Pollution - Ozone_Total 2021']) - 62;
    const xMax = d3.max(data, d => +d['Air Pollution - Ozone_Total 2021']);

    // Regression line
    const regLine = chart.selectAll(".regression-line")
        .data([null]);

    regLine.enter().append("line")
        .attr("class", "regression-line")
        .merge(regLine)
        .transition()
        .duration(500)
        .attr("x1", xScale(xMin))
        .attr("y1", yScale(slope * xMin + intercept))
        .attr("x2", xScale(xMax))
        .attr("y2", yScale(slope * xMax + intercept))
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4 2");


    // Data points
    let circles = chart.selectAll(".dot")
        .data(data, d => d.city);

    circles.exit()
        .transition()
        .duration(500)
        .attr("r", 0)
        .remove();

    circles.transition()
        .duration(500)
        .attr("cx", d => xScale(+d['Air Pollution - Ozone_Total 2021']))
        .attr("cy", d => yScale(+d['Cardiovascular Disease Deaths_2021_Total\r']));

    circles.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(+d['Air Pollution - Ozone_Total 2021']))
        .attr("cy", d => yScale(+d['Cardiovascular Disease Deaths_2021_Total\r']))
        .attr("r", 0)
        .attr("fill", "#4c9db2")
        .attr("opacity", 0.7)
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .transition()
        .duration(1000)
        .attr("r", Math.max(4, Math.round(6 * scale)));

    chart.selectAll(".dot")
        .on("mouseover", showInfo)
        .on("mousemove", moveInfo)
        .on("mouseout", hideInfo)
        .on("mousedown", updateCity);

    scattersvg.on("mousedown", function() {
    activeCity = null;
    updateActiveCity(null);
    clearHighlightScatter();
    });

    // Axes
    chart.select(".x-axis")
        .transition()
        .duration(500)
        .call(d3.axisBottom(xScale));

    chart.select(".y-axis")
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScale));

    // Tweak tick label sizes to avoid cramping
    const tickFont = `${Math.max(9, Math.round(16 * scale))}px`;
    chart.selectAll('.x-axis text').style('font-size', tickFont);
    chart.selectAll('.y-axis text').style('font-size', tickFont);

    // Update axis label font sizes in case of resize
    chart.select('.x-label').style('font-size', `${Math.max(10, Math.round(22 * scale))}px`);
    chart.select('.y-label').style('font-size', `${Math.max(10, Math.round(22 * scale))}px`);

    // Axis labels
    chart.select(".x-label").text("Air Pollution, Ozone (ppb)");
    chart.select(".y-label").text("Deaths by Cardiovascular Disease");

    if (title.length > 0)
    {
        scattersvg.select("#chart-title")
            .transition()
            .duration(500)
            .text(title);
    }
}

async function loadData() 
{
    await d3.json("scatter_plot_data.json").then(data => {
        scatterData = data;
    });
}

export async function initializeScatter()
{
    await loadData();
    initalizeSVG();
    updateScatterPlot(scatterData, "Air Pollution vs Cardiovascular Disease Deaths");

    // // Attach a debounced resize handler so the chart redraws when layout changes
    // if (!window._scatterResizeAttached) {
    //     window._scatterResizeAttached = true;
    //     let resizeTimeout = null;
    //     window.addEventListener('resize', () => {
    //         clearTimeout(resizeTimeout);
    //         resizeTimeout = setTimeout(() => {
    //             initalizeSVG();
    //             updateScatterPlot(scatterData, "Air Pollution vs Cardiovascular Disease Deaths (2021)");
    //         }, 150);
    //     });
    // }
}

initializeScatter();