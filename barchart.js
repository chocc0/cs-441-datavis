let svgBar = d3.select("#bar-svg");
let cellpadding = 30;
let text_align = 15;
let w = 30; // bar width
let h = 500 + cellpadding;
let bar_frac = 3;
let graph_w = 271*w; // 271 total samples
let graph_h = 500;
let highlight = ((graph_h/bar_frac)-cellpadding) * 0.095; // 15ppb is EPA setpoint (prior to 2024) & 158ppb is max measured --> 15ppb = 158ppb * 0.095
let barData;

async function loadData() {
    try {
        barData = await d3.json("Flint Bar Data.json");
    } catch (err) {
        console.error("Failed to load Flint Bar Data.json:", err);
    }
}

function initialiseSVG() {
    svgBar.selectAll("*").remove();

    // // Compute available size from CSS/layout; enforce a minimum scale
    // const bbox = svgBar.node().getBoundingClientRect();
    // const MIN_WIDTH = 360;
    // const MIN_HEIGHT = 270; // 4:3 fallback
    // const width = Math.max(MIN_WIDTH, Math.round(bbox.width) || MIN_WIDTH);
    // const height = Math.max(MIN_HEIGHT, Math.round(bbox.height) || Math.round(width * 0.75));

    // // Set viewBox so svg scales responsively
    // svgBar.attr('viewBox', `0 0 ${graph_w} ${graph_h}`)
    //         .attr('preserveAspectRatio', 'xMidYMid meet');
}

function drawFlintBar(data) {
        console.log(data);

}

export function highlightBar() {

}

export async function initialiseBar() {
    await loadData();
    initialiseSVG();
    drawFlintBar(barData);
}

initialiseBar();