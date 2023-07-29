// Sample data
const data = [
    { category: "A", value: 10 },
    { category: "B", value: 20 },
    { category: "C", value: 15 },
    // Add more data points as needed
];

// Parameters
let currentScene = 1;

// Container element
const container = d3.select("#visualization-container");

// Function to create the first scene
function createScene1() {
    // Clear the container
    container.html("");

    // Create scene elements
    container.append("h2").text("Scene 1");
    container.append("p").text("This is the first scene of the narrative.");

    // Add button for user interaction
    container
        .append("button")
        .text("Continue to Scene 2")
        .on("click", () => {
            currentScene = 2;
            updateVisualization();
        });
}

// Function to create the second scene
function createScene2() {
    // Clear the container
    container.html("");

    // Create scene elements
    container.append("h2").text("Scene 2");
    container.append("p").text("This is the second scene of the narrative.");

    // Add chart for data visualization (e.g., a bar chart)
    const svg = container.append("svg")
        .attr("width", 400)
        .attr("height", 300);

    // Add chart elements using D3

    // Add button for user interaction
    container
        .append("button")
        .text("Continue to Scene 3")
        .on("click", () => {
            currentScene = 3;
            updateVisualization();
        });
}

// Function to create the third scene
function createScene3() {
    // Clear the container
    container.html("");

    // Create scene elements
    container.append("h2").text("Scene 3");
    container.append("p").text("This is the final scene of the narrative.");

    // Add additional chart or data visualization (if needed)

    // End of the narrative
}

// Function to update the visualization based on the current scene
function updateVisualization() {
    switch (currentScene) {
        case 1:
            createScene1();
            break;
        case 2:
            createScene2();
            break;
        case 3:
            createScene3();
            break;
        default:
            console.error("Invalid scene number");
    }
}

// Initialize the visualization
updateVisualization();
