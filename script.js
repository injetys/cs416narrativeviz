index html: // Function to read and parse CSV data
function parseCSVData(csvData) {
    const rows = csvData.split("\n").slice(1); // Skipping the header row
    const rowData = rows.map(row => row.split(","));
    return rowData;
}

// Function to count the rows in the dataset
function countRows(csvData) {
    return csvData.length;
}

// Function to display the row count on the HTML page
function displayRowCount(rowCount) {
    const rowCountElement = document.getElementById("row-count");
    rowCountElement.textContent = `Row Count: ${rowCount}`;
}

// Function to display the data table on the HTML page
function displayDataTable(csvData) {
    const data = parseCSVData(csvData);
    const table = document.getElementById("data-table");

    // Creating the table headers
    const headers = data[0];
    const headerRow = document.createElement("tr");
    for (const header of headers) {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Creating the table rows
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const dataRow = document.createElement("tr");
        for (const cell of row) {
            const td = document.createElement("td");
            td.textContent = cell;
            dataRow.appendChild(td);
        }
        table.appendChild(dataRow);
    }
}

// Main function to fetch data and display on the page
function main() {
    const csvFilePath = 'female_players_legacy.csv';
    fetch(csvFilePath, { mode: 'no-cors' })
        .then(response => response.text())
        .then(csvData => {
            const rowCount = countRows(csvData);
            displayRowCount(rowCount);
            displayDataTable(csvData);
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Call the main function when the script is loaded
main();
