// Function to read and parse CSV data
function parseCSVData(csvData) {
    const rows = csvData.split("\n").slice(1); // Skipping the header row
    const rowData = rows.map(row => row.split(","));
    return rowData;
}

// Function to count the players for each nationality
function countPlayersByNationality(csvData) {
    const data = parseCSVData(csvData);
    const nationalityColumnIndex = 3; // Assuming the nationality column is at index 3 (0-indexed)
    const playerCountByNationality = {};

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const nationality = row[nationalityColumnIndex].trim();

        // Count players for each nationality
        if (playerCountByNationality[nationality]) {
            playerCountByNationality[nationality]++;
        } else {
            playerCountByNationality[nationality] = 1;
        }
    }

    return playerCountByNationality;
}

// Function to display the graph
function displayPlayerCountGraph(playerCountByNationality) {
    const chartData = {
        labels: Object.keys(playerCountByNationality),
        datasets: [
            {
                label: 'Player Count by Nationality',
                data: Object.values(playerCountByNationality),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Adjust the color as needed
                borderColor: 'rgba(75, 192, 192, 1)', // Adjust the color as needed
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const playerCountChart = new Chart('player-count-chart', {
        type: 'bar', // You can change this to 'pie', 'doughnut', 'line', etc. as desired
        data: chartData,
        options: chartOptions,
    });
}

// Function to show/hide loading indicator
function toggleLoadingIndicator() {
    const loadingDiv = document.getElementById('loading');
    const chartCanvas = document.getElementById('player-count-chart');

    loadingDiv.style.display = 'none';
    chartCanvas.style.display = 'block';
}

// Main function to fetch data and display the graph
function main() {
    const csvFilePath = 'female_players_legacy.csv';
    fetch(csvFilePath, { mode: 'no-cors' })
        .then(response => response.text())
        .then(csvData => {
            const playerCountByNationality = countPlayersByNationality(csvData);
            displayPlayerCountGraph(playerCountByNationality);
            toggleLoadingIndicator();
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Call the main function when the script is loaded
main();
