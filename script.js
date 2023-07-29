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

// Function to create and display the bar chart for Scene 1 (Overview)
function displayBarChartScene1(data) {
    const chartContainer = d3.select("#chart");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const barPadding = 5;

    const nationalityCount = d3.rollups(data, v => v.length, d => d.nationality_name);

    const xScale = d3.scaleBand()
        .domain(nationalityCount.map(d => d[0]))
        .range([margin.left, chartWidth - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(nationalityCount, d => d[1])])
        .range([chartHeight - margin.bottom, margin.top]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Adding bars
    const bars = svg.selectAll("rect")
        .data(nationalityCount)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - margin.bottom - yScale(d[1]))
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
            // Tooltip for Scene 1: Show nationality name on hover
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "inline")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 25) + "px")
                .text(d[0]);
        })
        .on("mouseout", function () {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "none");
        });
}
// Function to create and display the bar chart for Scene 2 (Drill Down)
function displayBarChartScene2(data, selectedNationality) {
    const filteredData = data.filter(row => row.nationality_name === selectedNationality);

    const chartContainer = d3.select("#chart");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const barPadding = 5;

    const xScale = d3.scaleBand()
        .domain(filteredData.map(d => d.player_name))
        .range([margin.left, chartWidth - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(filteredData, d => +d.overall)])
        .range([chartHeight - margin.bottom, margin.top]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Adding bars
    const bars = svg.selectAll("rect")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.player_name))
        .attr("y", d => yScale(d.overall))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - margin.bottom - yScale(d.overall))
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
            // Tooltip for Scene 2: Show player name and overall rating on hover
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "inline")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 25) + "px")
                .html(`Player: ${d.player_name}<br>Overall Rating: ${d.overall}`);
        })
        .on("mouseout", function () {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "none");
        })
        .on("click", function (event, d) {
            // Click event to trigger Scene 3 (Player Performance) with the selected player name
            showScene3(data, d.player_name);
        });
}
// Function to create and display the line chart for Scene 3 (Player Performance)
function displayLineChartScene3(data, selectedPlayerName) {
    const selectedPlayerData = data.find(row => row.player_name === selectedPlayerName);
    const positions = [
        'ls', 'st', 'rs', 'lw', 'lf', 'cf', 'rf', 'rw',
        'lam', 'cam', 'ram', 'lm', 'lcm', 'cm', 'rcm', 'rm',
        'lwb', 'ldm', 'cdm', 'rdm', 'rwb',
        'lb', 'lcb', 'cb', 'rcb', 'rb', 'gk'
    ];

    const chartContainer = d3.select("#chart");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 600;
    const chartHeight = 400;
    const margin = { top: 20, right: 40, bottom: 40, left: 60 };

    const xScale = d3.scaleBand()
        .domain(positions)
        .range([margin.left, chartWidth - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([chartHeight - margin.bottom, margin.top]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Adding lines
    const line = d3.line()
        .x(d => xScale(d.position))
        .y(d => yScale(d.rating));

    svg.append("path")
        .datum(positions.map(position => ({ position, rating: +selectedPlayerData[position] })))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Adding points
    svg.selectAll("circle")
        .data(positions.map(position => ({ position, rating: +selectedPlayerData[position] })))
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.position) + xScale.bandwidth() / 2)
        .attr("cy", d => yScale(d.rating))
        .attr("r", 4)
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
            // Tooltip for Scene 3: Show rating for each position on hover
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "inline")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 25) + "px")
                .text(`Rating: ${d.rating}`);
        })
        .on("mouseout", function () {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "none");
        });
}
// Main function to fetch data and display on the page
function main() {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);

            // Trigger Scene 1 (Overview)
            displayBarChartScene1(data);

            // Define click event listener for Scene 2
            d3.selectAll("rect").on("click", function (event, d) {
                showScene2(d[0]); // d[0] contains the selected nationality from Scene 1
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Call the main function when the script is loaded
main();
