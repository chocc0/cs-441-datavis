let scattersvg = d3.select("#scatter-svg");
let chart, xScale, yScale, chartWidth, chartHeight;
let scatterData = [];

const width = 800;
const height = 600;

function initalizeSVG()
{
    scattersvg.attr("width", width);
    scattersvg.attr("height", height);
    scattersvg.selectAll("*").remove();

    const margin = { top: 30, right: 30, bottom: 60, left: 70 };
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
        .style("font-size", "12px")
        .style("fill", "white")
        .text("");

    chart.append("text")
        .attr("class", "y-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", -55)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "white")
        .text("");

    scattersvg.append("text")
        .attr("id", "chart-title")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "white")
        .text("");
}

function updateScatterPlot(data, title = "")
{
    xScale.domain([d3.min(data, d => d['Air Pollution - Ozone_Total 2019']) -50, d3.max(data, d => d['Air Pollution - Ozone_Total 2019'])]).nice();
    yScale.domain([0, d3.max(data, d => +d['Cardiovascular Disease Deaths_2019_Total\r'])]).nice();

    // Regression line calculation
    const xMean = d3.mean(data, d => +d['Air Pollution - Ozone_Total 2019']);
    const yMean = d3.mean(data, d => +d['Cardiovascular Disease Deaths_2019_Total\r']);
    const slope = d3.sum(data, d => (+d['Air Pollution - Ozone_Total 2019'] - xMean) * (+d['Cardiovascular Disease Deaths_2019_Total\r'] - yMean))
                / d3.sum(data, d => Math.pow(+d['Air Pollution - Ozone_Total 2019'] - xMean, 2));
    const intercept = yMean - slope * xMean;

    const xMin = d3.min(data, d => d['Air Pollution - Ozone_Total 2019']) - 62;
    const xMax = d3.max(data, d => +d['Air Pollution - Ozone_Total 2019']);

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
    const circles = chart.selectAll(".dot")
        .data(data, d => d.city);

    circles.exit()
        .transition()
        .duration(500)
        .attr("r", 0)
        .remove();

    circles.transition()
        .duration(500)
        .attr("cx", d => xScale(+d['Air Pollution - Ozone_Total 2019']))
        .attr("cy", d => yScale(+d['Cardiovascular Disease Deaths_2019_Total\r']));

    circles.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(+d['Air Pollution - Ozone_Total 2019']))
        .attr("cy", d => yScale(+d['Cardiovascular Disease Deaths_2019_Total\r']))
        .attr("r", 0)
        .attr("fill", "steelblue")
        .attr("opacity", 0.7)
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .transition()
        .duration(1000)
        .attr("r", 6);

    // Axes
    chart.select(".x-axis")
        .transition()
        .duration(500)
        .call(d3.axisBottom(xScale));

    chart.select(".y-axis")
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScale));

    // Axis labels
    chart.select(".x-label").text("Air Pollution - Ozone Total 2019");
    chart.select(".y-label").text("Cardiovascular Disease Deaths 2019 Total\r");

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
    await d3.json("/scatter_plot_data.json").then(data => {
        scatterData = data;
    });
}

async function initalize()
{
    await loadData();
    initalizeSVG();
    updateScatterPlot(scatterData, "Air Pollution vs Cardiovascular Disease Deaths (2019)");
}

initalize();
