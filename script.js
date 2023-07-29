// Define the CSV file path
const csvFilePath = "https://github.com/injetys/cs416narrativeviz/blob/main/female_players_legacy.csv";

// Function to create the bar graph
function createBarGraph(data) {
  const svgWidth = 600;
  const svgHeight = 400;
  const margin = { top: 20, right: 20, bottom: 60, left: 60 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Create SVG element
  const svg = d3
    .select("#visualization-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Create chart group
  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Process the data
  const nationalityCounts = d3.rollups(data, v => v.length, d => d.nationality);

  // X scale
  const xScale = d3
    .scaleBand()
    .domain(nationalityCounts.map(d => d[0]))
    .range([0, chartWidth])
    .paddingInner(0.1)
    .paddingOuter(0.2);

  // Y scale
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(nationalityCounts, d => d[1])])
    .range([chartHeight, 0]);

  // X axis
  const xAxis = d3.axisBottom(xScale);

  // Y axis
  const yAxis = d3.axisLeft(yScale);

  // Append X axis to the chart
  chart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -10)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

