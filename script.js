// Function to parse CSV data using D3
function parseCSVData(csvData) {
    const rows = d3.csvParse(csvData);
    return rows;
}
// Function to count the rows in the dataset
function countRows(csvData) {
    const rows = csvData.split("\n");
    return rows.length;
}
// Function to create and display the scatter plot for Scene 1
function displayScatterPlotScene1(data) {
    const chartContainer = d3.select("#chart");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.age))
        .range([margin.left, chartWidth - margin.right]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.overall))
        .range([chartHeight - margin.bottom, margin.top]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Adding circles for the scatter plot
    const circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.age))
        .attr("cy", d => yScale(d.overall))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .attr("title", d => `Age: ${d.age}, Overall: ${d.overall}`)
        .on("mouseover", function (event, d) {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "inline")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 25) + "px")
                .text(`Age: ${d.age}, Overall: ${d.overall}`);
        })
        .on("mouseout", function () {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "none");
        });

    // Adding x-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
        .call(xAxis);

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
}
// Function to create and display the scatter plot for Scene 3
function displayScatterPlotScene3(data) {
    const chartContainer = d3.select("#chart");
    chartContainer.append("hr"); // Add a horizontal line between Scene 2 and Scene 3

    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.height_cm))
        .range([margin.left, chartWidth - margin.right]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.weight_kg))
        .range([chartHeight - margin.bottom, margin.top]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Adding circles for the scatter plot
    const circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.height_cm))
        .attr("cy", d => yScale(d.weight_kg))
        .attr("r", 5)
        .attr("fill", "steelblue")
        .attr("title", d => `Height: ${d.height_cm} cm, Weight: ${d.weight_kg} kg`)
        .on("mouseover", function (event, d) {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "inline")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 25) + "px")
                .text(`Height: ${d.height_cm} cm, Weight: ${d.weight_kg} kg`);
        })
        .on("mouseout", function () {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "none");
        });

    // Adding x-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
        .call(xAxis);

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
}
// Function to trigger Scene 1 and Scene 2 (Scatter Plot of Age vs. Overall)
function showScene1() {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);
            displayScatterPlotScene1(data);
            showScene2(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}
// Function to trigger Scene 3 (Scatter Plot of Height vs. Weight)
function showScene3(data) {
    displayScatterPlotScene3(data);
}

// Call the main function when the script is loaded
showScene1();
