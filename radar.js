let svg = d3.select("#radar");
const width = 800;
const height = 800;
const radius = 250;
let chart;
let atlantaChartData;

async function loadData() {
    await d3.json("/Atlanta Radial.json").then(data => {
        atlantaChartData = data;
    });
}

function initialiseSVG(){
    svg.attr("width", width);
    svg.attr("height", height);

    chart = svg.append("g")
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
}

function drawAtlantaRadial(data) {

    const radialScale = d3.scaleLinear()
        .domain([0, 100]) // percentages 
        .range([0, radius]);

    const race = ["Asian", "Black", "Hispanic", "Other", "White"];
    const spoke = (2 * Math.PI) / race.length;

    // Draw concentric grid rings (DOTTED)
    for (let ring=1; ring<=10; ring+=2) { // 10% increments
        
        let increments1 = ""; // x,y values for each spoke's increments (rings)
        for (let i=0; i<race.length; i++) {
            increments1 += ( Math.cos(spoke*i) * radius * (ring/10) ) + "," + 
                ( Math.sin(spoke*i) * radius * (ring/10) ) + " ";
        }
        chart.append("polygon") // rings
            .attr("points", increments1)
            .attr("fill", "none")
            .attr("stroke", "#767676")
            .style("stroke-dasharray", ("2, 2"))
            .style("opacity", 0.5);
        chart.append("text") // % labels
            .attr("x", (radius*ring/10)-(radius/12)) // radius/12 aligns text
            .attr("y", 0)
            .attr("font-size", "xx-small")
            .style("opacity", 0.7)
            .text(ring*10 + "%");
    }
    // Draw concentric grid rings (DASHED) 
    for (let ring=2; ring<=10; ring+=2) { // 10% increments
        
        let increments2 = ""; // x,y values for each spoke's increments (rings)
        for (let i=0; i<race.length; i++) {
            increments2 += ( Math.cos(spoke*i) * radius * (ring/10) ) + "," + 
                ( Math.sin(spoke*i) * radius * (ring/10) ) + " ";
        }
        chart.append("polygon") // rings
            .attr("points", increments2)
            .attr("fill", "none")
            .attr("stroke", "#767676")
            .style("stroke-dasharray", ("10, 5"))
            .style("opacity", 0.5);
        chart.append("text") // % labels
            .attr("x", (radius*ring/10)-(radius/12)) // radius/12 aligns text
            .attr("y", 0)
            .attr("font-size", "xx-small")
            .style("opacity", 0.7)
            .text(ring*10 + "%");
    }

    // Draw spokes as the axes
    chart.selectAll("line")
        .data(race)
        .enter()
        .append("line")
        .attr("x1", 0) // center
        .attr("x2", (d, i) => 
            Math.cos(spoke*i) * radius) // extends x-direction
        .attr("y1", 0) // center
        .attr("y2", (d, i) => 
            Math.sin(spoke*i) * radius) // extends y-direction
        .attr("stroke", "#000000");

    // Draw labels for the axes
    chart.selectAll("text.label")
        .data(race)
        .enter()
        .append("text")
        .attr("x", (d, i) => 
            Math.cos(spoke*i) * radius + labelPadding(spoke*i))
        .attr("y", (d, i) => 
            Math.sin(spoke*i) * radius + labelPadding(spoke*i))
        .attr("text-anchor", (d, i) => labelAlign(spoke*i))
        .attr("font-size", "medium")
        .text(d => d + 
            " (" + data[0]["High School Completion_2023_"+d] + "%)");

        // Draw the data into a radar
        let radar = ""; // x,y values for each data point
        for (let i=0; i<race.length; i++) {
            radar += ( Math.cos(spoke*i) * radialScale(data[0]["High School Completion_2023_"+race[i]]) ) + "," + 
                ( Math.sin(spoke*i) * radialScale(data[0]["High School Completion_2023_"+race[i]]) ) + " ";
        }
        chart.append("polygon")
            .attr("points", radar)
            .attr("fill", "#9ed6ff")
            .attr("fill-opacity", 0.2)
            .attr("stroke-width", 2)
            .attr("stroke", "#0095ff");

        // Add title above graph
        chart.append("text")
            .attr("x", 0)
            .attr("y", -radius-(radius/5)) // -radius goes up bc y=0 is center, radius/5 aligns text
            .attr("text-anchor", "middle")
            .attr("font-size", "x-large")
            .text("Atlanta: High School Graduation Rate by Race");
}

// Determines how labels align with spokes
function labelAlign(spoke) {
    let x = Math.cos(spoke) * radius;
    let y = Math.sin(spoke) * radius;
    
    if (x<0) return "end";
    if (y<0) return "middle";
    return "start";
}

// Determines which direction padding is needed for labels
function labelPadding(spoke) {
    let x = Math.cos(spoke) * radius;
    let y = Math.sin(spoke) * radius;
    
    if (x<0) return -10;
    if (y<0) return -10;
    return 10;
}

async function initialise() {
    await loadData();
    initialiseSVG();
    drawAtlantaRadial(atlantaChartData);
}

initialise();
