// Function to parse CSV data using D3
function parseCSVData(csvData) {
    const rows = d3.csvParse(csvData);
    return rows;
}

// Function to create and display the bar chart
function displayBarChart(data) {
    const counts = {};
    data.forEach(row => {
        const nationality = row.nationality_name;
        counts[nationality] = (counts[nationality] || 0) + 1;
    });

    const chartContainer = d3.select("#chart");
    const chartWidth = 500;
    const chartHeight = 300;
    const barPadding = 5;

    const xScale = d3.scaleBand()
        .domain(Object.keys(counts))
        .range([0, chartWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(Object.values(counts))])
        .range([0, chartHeight]);

    const svg = chartContainer.append("svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    const bars = svg.selectAll("rect")
        .data(Object.entries(counts))
        .enter()
        .append("rect")
        .attr("x", d => xScale(d[0]))
        .attr("y", d => chartHeight - yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d[1]))
        .attr("fill", "steelblue");

    // Adding labels to the bars
    svg.selectAll(".bar-label")
        .data(Object.entries(counts))
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d[0]) + xScale.bandwidth() / 2)
        .attr("y", d => chartHeight - yScale(d[1]) - 5)
        .attr("text-anchor", "middle")
        .text(d => d[1]);
}

// Main function to fetch data and display the bar chart
function main() {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);
            displayBarChart(data);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Call the main function when the script is loaded
main();
