// Function to parse CSV data using D3
function parseCSVData(csvData) {
    const rows = d3.csvParseRows(csvData);
    return rows;
}

// Function to display the row count on the HTML page
function displayRowCount(rowCount) {
    const rowCountElement = d3.select("#row-count");
    rowCountElement.text(`Row Count: ${rowCount}`);
}

// Function to display the data table on the HTML page
function displayDataTable(csvData) {
    const data = parseCSVData(csvData);
    const table = d3.select("#data-table");

    // Creating the table headers
    const headers = data[0];
    const headerRow = table.append("tr");
    headerRow.selectAll("th")
        .data(headers)
        .enter()
        .append("th")
        .text(header => header);

    // Creating the table rows
    const rows = table.selectAll("tr.data-row")
        .data(data.slice(1)) // Skip the first row (header)
        .enter()
        .append("tr")
        .attr("class", "data-row");

    // Adding cells to the rows
    rows.selectAll("td")
        .data(row => row)
        .enter()
        .append("td")
        .text(cell => cell);
}

// Main function to fetch data and display on the page
function main() {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const rowCount = parseCSVData(csvData).length;
            displayRowCount(rowCount);
            displayDataTable(csvData);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Call the main function when the script is loaded
main();
