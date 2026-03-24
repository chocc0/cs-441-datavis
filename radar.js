let svgRadar = d3.select("#radar-svg");
const widthR = 800;
const heightR = 800;
const radiusR = 250;
let chartRadar;
let atlantaChartData;

async function loadData() {
    try {
        atlantaChartData = await d3.json("Atlanta Radial.json");
    } catch (err) {
        console.error("Failed to load Atlanta Radial.json:", err);
    }
}

function initialiseSVG(){
    svgRadar.attr("width", widthR);
    svgRadar.attr("height", heightR);

    chartRadar = svgRadar.append("g")
        .attr("transform", "translate(" + widthR/2 + "," + heightR/2 + ")");
}

function drawAtlantaRadial(data) {

    const radialScale = d3.scaleLinear()
        .domain([0, 100]) // percentages 
        .range([0, radiusR]);

    const race = ["Asian", "Black", "Hispanic", "Other", "White"];
    const spoke = (2 * Math.PI) / race.length;

    // Draw concentric grid rings (DOTTED)
    for (let ring=1; ring<=10; ring+=2) { // 10% increments
        
        let increments1 = ""; // x,y values for each spoke's increments (rings)
        for (let i=0; i<race.length; i++) {
            increments1 += ( Math.cos(spoke*i) * radiusR * (ring/10) ) + "," + 
                ( Math.sin(spoke*i) * radiusR * (ring/10) ) + " ";
        }
        chartRadar.append("polygon") // rings
            .attr("points", increments1)
            .attr("fill", "none")
            .attr("stroke", "#767676")
            .style("stroke-dasharray", ("2, 2"))
            .style("opacity", 0.5);
        chartRadar.append("text") // % labels
            .attr("x", (radiusR*ring/10)-(radiusR/12)) // radius/12 aligns text
            .attr("y", 0)
            .attr("font-size", "xx-small")
            .style("opacity", 0.7)
            .text(ring*10 + "%");
    }
    // Draw concentric grid rings (DASHED) 
    for (let ring=2; ring<=10; ring+=2) { // 10% increments
        
        let increments2 = ""; // x,y values for each spoke's increments (rings)
        for (let i=0; i<race.length; i++) {
            increments2 += ( Math.cos(spoke*i) * radiusR * (ring/10) ) + "," + 
                ( Math.sin(spoke*i) * radiusR * (ring/10) ) + " ";
        }
        chartRadar.append("polygon") // rings
            .attr("points", increments2)
            .attr("fill", "none")
            .attr("stroke", "#767676")
            .style("stroke-dasharray", ("10, 5"))
            .style("opacity", 0.5);
        chartRadar.append("text") // % labels
            .attr("x", (radiusR*ring/10)-(radiusR/12)) // radius/12 aligns text
            .attr("y", 0)
            .attr("font-size", "xx-small")
            .style("opacity", 0.7)
            .text(ring*10 + "%");
    }

    // Draw spokes as the axes
    chartRadar.selectAll("line")
        .data(race)
        .enter()
        .append("line")
        .attr("x1", 0) // center
        .attr("x2", (d, i) => 
            Math.cos(spoke*i) * radiusR) // extends x-direction
        .attr("y1", 0) // center
        .attr("y2", (d, i) => 
            Math.sin(spoke*i) * radiusR) // extends y-direction
        .attr("stroke", "#000000");

    // Draw labels for the axes
    chartRadar.selectAll("text.label")
        .data(race)
        .enter()
        .append("text")
        .attr("x", (d, i) => 
            Math.cos(spoke*i) * radiusR + labelPadding(spoke*i))
        .attr("y", (d, i) => 
            Math.sin(spoke*i) * radiusR + labelPadding(spoke*i))
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
        chartRadar.append("polygon")
            .attr("points", radar)
            .attr("fill", "#9ed6ff")
            .attr("fill-opacity", 0.2)
            .attr("stroke-width", 2)
            .attr("stroke", "#0095ff");

        // Add title above graph
        chartRadar.append("text")
            .attr("x", 0)
            .attr("y", -radiusR-(radiusR/5)) // -radius goes up bc y=0 is center, radius/5 aligns text
            .attr("text-anchor", "middle")
            .attr("font-size", "x-large")
            .text("Atlanta: High School Graduation Rate by Race");
}

// Determines how labels align with spokes
function labelAlign(spoke) {
    let x = Math.cos(spoke) * radiusR;
    let y = Math.sin(spoke) * radiusR;
    
    if (x<0) return "end";
    if (y<0) return "middle";
    return "start";
}

// Determines which direction padding is needed for labels
function labelPadding(spoke) {
    let x = Math.cos(spoke) * radiusR;
    let y = Math.sin(spoke) * radiusR;
    
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
