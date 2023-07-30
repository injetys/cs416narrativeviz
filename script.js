
// Function to parse CSV data using D3
function parseCSVData(csvData) {
    const rows = d3.csvParse(csvData);
    return rows;
}
// Function to create and display the bar chart for Scene 1
function displayBarChartScene1(data) {
    const counts = {};
    data.forEach(row => {
        const nationality = row.nationality_name;
        counts[nationality] = (counts[nationality] || 0) + 1;
    });

    const chartContainer = d3.select("#chart1");
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
// Function to create and display the bar chart for Scene 2
function displayBarChartScene2(data, selectedNationality) {
    const filteredData = data.filter(row => row.nationality_name === selectedNationality);
    const counts = {};
    filteredData.forEach(row => {
        const league = row.league_name;
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
            showScene3(filteredData, d[0]);
        });

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
}
// Function to create and display the scatter plot for Scene 3
function displayScatterPlotScene3(data) {
    const chartContainer = d3.select("#chart3");
    chartContainer.html(""); // Clear previous content

    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.height_cm)])
        .range([margin.left, chartWidth - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.weight_kg)])
        .range([chartHeight - margin.bottom, margin.top]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    // Adding scatter plot points
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(+d.height_cm))
        .attr("cy", d => yScale(+d.weight_kg))
        .attr("r", 5)
        .attr("fill", "steelblue");

    // Adding x-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${chartHeight - margin.bottom})`)
        .call(xAxis)
        .append("text")
        .attr("x", chartWidth - margin.right)
        .attr("y", -5)
        .attr("fill", "#000")
        .attr("text-anchor", "end")
        .text("Height (cm)");

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis)
        .append("text")
        .attr("y", 15)
        .attr("fill", "#000")
        .text("Weight (kg)");
}
// Function to calculate average height and weight
function calculateAverageHeightWeight(data) {
    const totalHeight = data.reduce((acc, d) => acc + (+d.height_cm), 0);
    const totalWeight = data.reduce((acc, d) => acc + (+d.weight_kg), 0);
    const averageHeight = totalHeight / data.length;
    const averageWeight = totalWeight / data.length;
    return { averageHeight, averageWeight };
}

// Function to trigger Scene 1 (Overview)
function showScene1() {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);
            console.log(data); // Add this line to check the parsed data
            const { averageHeight, averageWeight } = calculateAverageHeightWeight(data);
            displayBarChartScene1(data);
            displayAverageHeightWeightScene1(averageHeight, averageWeight);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Function to display average height and weight for Scene 1
function displayAverageHeightWeightScene1(averageHeight, averageWeight) {
    const chartContainer = d3.select("#chart1");
    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 10, right: 10, bottom: 30, left: 60 };
    const svg = chartContainer.select("svg");

    // Display average height
    svg.append("text")
        .attr("x", chartWidth - margin.right)
        .attr("y", margin.top)
        .attr("text-anchor", "end")
        .text(`Average Height: ${averageHeight.toFixed(2)} cm`);

    // Display average weight
    svg.append("text")
        .attr("x", chartWidth - margin.right)
        .attr("y", margin.top + 20)
        .attr("text-anchor", "end")
        .text(`Average Weight: ${averageWeight.toFixed(2)} kg`);
}

// Function to trigger Scene 2 (Drill Down)
function showScene2(selectedNationality) {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);
            console.log(data); // Add this line to check the parsed data
            const filteredData = data.filter(row => row.nationality_name === selectedNationality);
            const { averageHeight, averageWeight } = calculateAverageHeightWeight(filteredData);
            displayBarChartScene2(filteredData, selectedNationality);
            displayAverageHeightWeightScene2(averageHeight, averageWeight);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Function to display average height and weight for Scene 2
function displayAverageHeightWeightScene2(averageHeight, averageWeight) {
    const chartContainer = d3.select("#chart2");
    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 10, right: 10, bottom: 30, left: 60 };
    const svg = chartContainer.select("svg");

    // Display average height
    svg.append("text")
        .attr("x", chartWidth - margin.right)
        .attr("y", margin.top)
        .attr("text-anchor", "end")
        .text(`Average Height: ${averageHeight.toFixed(2)} cm`);

    // Display average weight
    svg.append("text")
        .attr("x", chartWidth - margin.right)
        .attr("y", margin.top + 20)
        .attr("text-anchor", "end")
        .text(`Average Weight: ${averageWeight.toFixed(2)} kg`);
}

// Function to create and display the scatter plot for Scene 3
function displayScatterPlotScene3(data) {
    // Code for the scatter plot as provided before
}

// Function to trigger Scene 3 (Drill Down)
function showScene3(data, selectedLeague) {
    const filteredData = data.filter(row => row.league === selectedLeague);
    const { averageHeight, averageWeight } = calculateAverageHeightWeight(filteredData);
    displayScatterPlotScene3(filteredData);
    displayAverageHeightWeightScene3(averageHeight, averageWeight);
}

// Function to display average height and weight for Scene 3
function displayAverageHeightWeightScene3(averageHeight, averageWeight) {
    const chartContainer = d3.select("#chart3");
    const chartWidth = 500;
    const chartHeight = 300;
    const margin = { top: 10, right: 10, bottom: 30, left: 60 };
    const svg = chartContainer.select("svg");

    // Display average height
    svg.append("text")
        .attr("x", chartWidth - margin.right)
        .attr("y", margin.top)
        .attr("text-anchor", "end")
        .text(`Average Height: ${averageHeight.toFixed(2)} cm`);

    // Display average weight
    svg.append("text")
        .attr("x", chartWidth - margin.right)
        .attr("y", margin.top + 20)
        .attr("text-anchor", "end")
        .text(`Average Weight: ${averageWeight.toFixed(2)} kg`);
}

// Call the main function when the script is loaded
showScene1();
