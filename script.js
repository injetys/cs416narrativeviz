// Function to parse CSV data using D3
function parseCSVData(csvData) {
    const rows = d3.csvParse(csvData);
    console.log(rows); // Add this line to check the parsed data
    return rows;

// Function to count the rows in the dataset
function countRows(csvData) {
    const rows = csvData.split("\n");
    return rows.length;
}

// ... (the rest of the code)

// ... (previous code)

// Function to create and display the bar chart for Scene 1
// Function to create and display the pie chart for Scene 1
function displayPieChartScene1(data) {
    const counts = {};
    data.forEach(row => {
        const nationality = row.nationality_name;
        counts[nationality] = (counts[nationality] || 0) + 1;
    });

    const chartContainer = d3.select("#chart1");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 300;
    const chartHeight = 300;
    const radius = Math.min(chartWidth, chartHeight) / 2;

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight)
        .append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2})`);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
        .value(d => d.value)
        .sort(null);

    const dataForPie = pie(d3.entries(counts));

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Adding pie slices
    const slices = svg.selectAll("path")
        .data(dataForPie)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colorScale(i))
        .on("mouseover", function (event, d) {
            // Tooltip for Scene 1: Show nationality_name on hover
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "inline")
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 25) + "px")
                .text(d.data.key);
        })
        .on("mouseout", function () {
            const tooltip = d3.select("#tooltip");
            tooltip.style("display", "none");
        })
        .on("click", function (event, d) {
            // Trigger drill down to Scene 2 with selected nationality
            showScene2(d.data.key);
        });
}


// Function to create and display the bar chart for Scene 2
function displayBarChartScene2(data, selectedNationality) {
    const filteredData = data.filter(row => row.nationality_name === selectedNationality);
    const counts = {};
    filteredData.forEach(row => {
        const league = row.league;
        counts[league] = (counts[league] || 0) + 1;
    });

    const chartContainer = d3.select("#chart2");
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
            // Tooltip for Scene 2: Show league on hover
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
            // Trigger drill down to Scene 3 with selected league
            showScene3(data, d[0]);
        });

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
}


// Function to trigger Scene 2 (Drill Down)

// Function to trigger Scene 1 (Overview)
function showScene1() {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);
            console.log(data); // Add this line to check the parsed data
            displayPieChartScene1(data); // Change this line to display the pie chart
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Function to trigger Scene 2 (Drill Down)
function showScene2(selectedNationality) {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);
            console.log(data); // Add this line to check the parsed data
            displayBarChartScene2(data, selectedNationality);
        })
        .catch(error => console.error("Error fetching data:", error));
}



// Function to trigger Scene 3 (Conclusion)
function showScene3(data, selectedLeague) {
    const filteredData = data.filter(row => row.league === selectedLeague);

    const chartContainer = d3.select("#chart");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 300;
    const chartHeight = 150;

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Calculate average height and weight
    const averageHeight = d3.mean(filteredData, d => +d.height_cm);
    const averageWeight = d3.mean(filteredData, d => +d.weight_kg);

    // Display average height
    svg.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight / 3)
        .attr("text-anchor", "middle")
        .text(`Average Height: ${averageHeight.toFixed(2)} cm`);

    // Display average weight
    svg.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight * 2 / 3)
        .attr("text-anchor", "middle")
        .text(`Average Weight: ${averageWeight.toFixed(2)} kg`);
}



// Call the main function when the script is loaded
showScene1();
