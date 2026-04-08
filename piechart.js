const width = 550;
const height = 550;

let svg = d3.select("#pie-svg");

const data = [{label: " over norm", value: 45, color: "#ffaa68", p: Math.round(45 / 171 * 100)}, 
    {label: " under norm", value: (171-45), color: "#bfced1", p: Math.round((171-45) / 171 * 100)}];

function initPie() {
    svg.attr("width",width);
    svg.attr("height",height);

    svg.selectAll("*").remove();

    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    let chartWidth = width - margin.left - margin.right;
    let chartHeight = height - margin.top - margin.bottom;
    const radius = Math.min(chartWidth, chartHeight) / 2 - 10;

    let pieChart = svg.append("g")
        .attr("transform", "translate(" + (width/2+75) + "," + (height * 0.8) + ")"); 

    // Define an x scale which will assign a spot on the x axis to each of the unique values of colour in the dataset
    let pie = d3.pie().value(d => d.value)
    let colorArc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius);
    let labelArc = d3.arc()
                    .innerRadius(radius / 2)
                    .outerRadius(radius / 2);
    let arcs = pieChart.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc")
                    .style("font-weight", 500);

    arcs.append("path")
        .attr("d", colorArc)
        .attr("fill", d => d.data.color)
        .attr("stroke", "dark gray")

    arcs.append("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "16px")
        .style("fill", "dark gray")
        .text(d => d.data.p + "% " + d.data.label);

    const title = svg.append("text")
        .attr("x", width / 2)
        .attr("y", 150) // 20
        .attr("text-anchor", "middle")
        .style("font-size", "22px") // 25
        .style("font-weight", "bold")
        .style("fill", "black");

    title.append("tspan") // tspan from AI
        .attr("x", width/2 + 75)
        .text("Lead Water Levels (ppb) in Flint, MI Homes (2015)")
    title.append("tspan")
        .attr("x", width/2+75)
        .attr("dy", "1.2em")
        .text("Relative to Norm (15 ppb)");

}

export function initializePie() {
    initPie();
}