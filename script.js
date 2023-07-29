// Define the CSV file path
const csvFilePath = "https://injetys.github.io/cs416narrativeviz/female_playerslegacy.csv";

// Load the CSV file and display its content
d3.csv(csvFilePath)
  .then(data => {
    console.log("Dataset loaded successfully:", data);
  })
  .catch(error => {
    console.error("Error loading CSV file:", error);
  });
