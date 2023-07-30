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
        .attr("title", d => d[0]) // Add tooltip for nationality_name
        .on("mouseover", function (event, d) {
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
            showScene2(d[0]);
        });

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
}

// ... (rest of the code for Scene 1)
// Function to create and display the bar chart for Scene 2
function displayBarChartScene2(data, selectedNationality) {
    const filteredData = data.filter(row => row.nationality_name === selectedNationality);
    const counts = {};
    filteredData.forEach(row => {
        const league = row.league;
        counts[league] = (counts[league] || 0) + 1;
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
        .attr("title", d => d[0]) // Add tooltip for league name
        .on("mouseover", function (event, d) {
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

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
}

// ... (rest of the code for Scene 2)
// ... (rest of the code)

// Function to trigger Scene 1 (Overview)
function showScene1() {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);
            displayBarChartScene1(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// ... (rest of the code)

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

// Call the main function when the script is loaded
showScene1();
