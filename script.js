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

// ... (previous code)

// Function to create and display the bar chart for Scene 1
function displayBarChartScene1(data) {
    const counts = {};
    data.forEach(row => {
        const nationality = row.nationality_name;
        counts[nationality] = (counts[nationality] || 0) + 1;
    });

    const chartContainer = d3.select("#chart");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const barPadding = 5;

    const xScale = d3.scaleBand()
        .domain(Object.keys(counts))
        .range([margin.left, chartWidth - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(counts))])
        .range([chartHeight - margin.bottom, margin.top]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Adding bars
    const bars = svg.selectAll("rect")
        .data(Object.entries(counts))
        .enter()
        .append("rect")
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - margin.bottom - yScale(d[1]))
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) {
            // Tooltip for Scene 1: Show nationality_name on hover
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "inline")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 25) + "px")
                .text(d[0]);
        })
        .on("mouseout", function () {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "none");
        })
        .on("click", function (event, d) {
            // Trigger drill down to Scene 2 with selected nationality
            showScene2(d[0]);
        });

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
}

// ... (previous code)

// Function to create and display the bar chart for Scene 2
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
            // Tooltip for Scene 2: Show overall rating and player name on hover
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
            // Trigger Scene 3 with selected player
            showScene3(data, d.player_name);
        });

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
}

// ... (the rest of the code)
// Function to create and display the line chart for Scene 3
function displayLineChartScene3(data, selectedPlayerName) {
    const selectedPlayerData = data.find(row => row.player_name === selectedPlayerName);

    const chartContainer = d3.select("#chart");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 600;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    const positions = [
        "ls", "st", "rs", "lw", "lf", "cf", "rf", "rw", "lam", "cam", "ram",
        "lm", "lcm", "cm", "rcm", "rm", "lwb", "ldm", "cdm", "rdm", "rwb",
        "lb", "lcb", "cb", "rcb", "rb", "gk"
    ];

    const xScale = d3.scaleBand()
        .domain(positions)
        .range([margin.left, chartWidth - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, 100]) // Assuming rating is between 0 and 100
        .range([chartHeight - margin.bottom, margin.top]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Adding lines
    const line = d3.line()
        .x(d => xScale(d.position))
        .y(d => yScale(d.rating));

    svg.append("path")
        .datum(positions.map(position => ({ position, rating: selectedPlayerData[position] })))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Adding points
    svg.selectAll("circle")
        .data(positions.map(position => ({ position, rating: selectedPlayerData[position] })))
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

// ... (the rest of the code)
// ... (previous code)

// Function to trigger Scene 2 (Drill Down)
function showScene2(selectedNationality) {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);
            displayBarChartScene2(data, selectedNationality);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Function to trigger Scene 3 (Player Performance Line Chart)
function showScene3(data, selectedPlayerName) {
    const chartContainer = d3.select("#chart");
    chartContainer.html(""); // Clear previous content

    // Call the function to display Scene 3 (Player Performance Line Chart)
    displayLineChartScene3(data, selectedPlayerName);
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
