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
        .attr("fill", "steelblue");

    // Adding labels to the bars
    svg.selectAll(".bar-label")
        .data(Object.entries(counts))
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("x", d => xScale(d[0]) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d[1]) - 5)
        .attr("text-anchor", "middle")
        .text(d => d[1]);

    // Adding nationality_name labels under the bars
    svg.selectAll(".nationality-label")
        .data(Object.entries(counts))
        .enter()
        .append("text")
        .attr("class", "nationality-label")
        .attr("x", d => xScale(d[0]) + xScale.bandwidth() / 2)
        .attr("y", chartHeight - margin.bottom + 20)
        .attr("text-anchor", "middle")
        .text(d => d[0]);

    // Adding y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
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
