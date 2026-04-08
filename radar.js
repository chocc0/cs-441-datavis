let svgRadar = d3.select("#radar-svg");
let widthR = 800;
let heightR = 800;
let radiusR = 200;
let chartRadar;
let radarData;

let activeCity = "Atlanta, GA";

async function loadData() {
    try {
        radarData = await d3.json("radar_data.json");
    } catch (err) {
        console.error("Failed to load Atlanta Radial.json:", err);
    }
}

function initialiseSVG(){
    // Clear previous contents
    svgRadar.selectAll("*").remove();

    // Compute available size from layout; enforce minimum scale
    const bbox = svgRadar.node().getBoundingClientRect();
    const MIN_WIDTH = 360;
    const MIN_HEIGHT = 270;
    widthR = Math.max(MIN_WIDTH, Math.round(bbox.width) || MIN_WIDTH);
    heightR = Math.max(MIN_HEIGHT, Math.round(bbox.height) || Math.round(widthR * 0.75));

    // Set viewBox so svg scales responsively
    svgRadar.attr('viewBox', `0 0 ${widthR} ${heightR}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

    // radius is a third of the smaller dimension
    radiusR = (1/3) * Math.min(widthR, heightR);

    chartRadar = svgRadar.append("g")
        .attr("transform", `translate(${widthR/2},${heightR/2})`);

    resetCity();
}

function getCityData(cityName) {
    return radarData.find(d => d.city === cityName) 
        ?? radarData[0];
}

export function updateCity(cityName) {
    activeCity = cityName;
    chartRadar.selectAll("*").remove();
    drawRadial(getCityData(cityName));
}

export function resetCity() {
    activeCity = null;
    chartRadar.selectAll("*").remove();
    drawRadial(getCityData("Atlanta, GA"));
}

function drawRadial(data) {

    chartRadar.selectAll("*").remove();
    const radialScale = d3.scaleLinear()
        .domain([50, 100]) // percentage values 
        .range([0, radiusR]);

    const race = ["Asian", "Black", "Hispanic", "Other", "White\r"];
    const spoke = (2 * Math.PI) / race.length;
    const increments = [0, 60, 70, 80, 90, 100]
    // scale-dependent font sizes
    const ringLabelSize = `${Math.max(8, Math.round(radiusR * 0.06))}px`;
    const axisLabelSize = `${Math.max(10, Math.round(radiusR * 0.07))}px`;
    const titleSize = `${Math.max(12, Math.round(radiusR * 0.09))}px`;

    // Draw concentric grid rings (DASHED)
    for (let ring=1; ring<=5; ring+=2) { // 10% increments
        
        let increments1 = ""; // x,y values for each spoke's increments (rings)
        for (let i=0; i<race.length; i++) {
            increments1 += ( Math.cos(spoke*i) * radiusR * (ring/5) ) + "," + 
                ( Math.sin(spoke*i) * radiusR * (ring/5) ) + " ";
        }
        chartRadar.append("polygon") // rings
            .attr("points", increments1)
            .attr("fill", "none")
            .attr("stroke", "#767676")
            .style("stroke-dasharray", ("10, 8"))
            .style("opacity", 0.5);
        chartRadar.append("text") // % labels
            .attr("x", (radiusR*ring/5)-(radiusR/8)) // radius/8 aligns text
            .attr("y", 0)
            .style("font-size", ringLabelSize)
            .style("opacity", 0.7)
            .text(increments[ring] + "%");
    }
    // Draw concentric grid rings (DOTTED) 
    for (let ring=2; ring<=5; ring+=2) { // 10% increments
        
        let increments2 = ""; // x,y values for each spoke's increments (rings)
        for (let i=0; i<race.length; i++) {
            increments2 += ( Math.cos(spoke*i) * radiusR * (ring/5) ) + "," + 
                ( Math.sin(spoke*i) * radiusR * (ring/5) ) + " ";
        }
        chartRadar.append("polygon") // rings
            .attr("points", increments2)
            .attr("fill", "none")
            .attr("stroke", "#767676")
            .style("stroke-dasharray", ("2, 5"))
            .style("opacity", 0.5);
        chartRadar.append("text") // % labels
            .attr("x", (radiusR*ring/5)-(radiusR/8)) // radius/8 aligns text
            .attr("y", 0)
            .style("font-size", ringLabelSize)
            .style("opacity", 0.7)
            .text(increments[ring] + "%");
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
        .style("font-size", axisLabelSize)
        .text(d => d + 
            " (" + data["High School Completion_2021_"+d] + "%)");

        // Draw the data into a radar
        let radar = ""; // x,y values for each data point
        for (let i=0; i<race.length; i++) {
            radar += ( Math.cos(spoke*i) * radialScale(data["High School Completion_2021_"+race[i]]) ) + "," + 
                ( Math.sin(spoke*i) * radialScale(data["High School Completion_2021_"+race[i]]) ) + " ";
        }
        chartRadar.append("polygon")
            .attr("points", radar)
            .attr("fill", "#9ed6ff")
            .attr("fill-opacity", 0.2)
            .attr("stroke-width", Math.max(1, Math.round(radiusR * 0.01)))
            .attr("stroke", "#0095ff");

        // Add title above graph
        // chartRadar.append("text")
        //     .attr("x", 0)
        //     .attr("y", -radiusR-(radiusR/5)) // -radius goes up bc y=0 is center, radius/5 aligns text
        //     .attr("text-anchor", "middle")
        //     .style("font-size", titleSize)
        //     .text("High School Graduation Rate by Race");
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
    const pad = Math.max(6, Math.round(radiusR * 0.06));
    if (x < 0) return -pad;
    if (y < 0) return -pad;
    return pad;
}

export async function initialiseRadar() {
    await loadData();
    initialiseSVG();
    drawAtlantaRadial(atlantaChartData);

    updateCity(activeCity);
}
