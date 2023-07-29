// Function to parse CSV data using D3
function parseCSVData(csvData) {
    const rows = d3.csvParse(csvData);
    return rows;
}

// Function to create and display Scene 1
function displayScene1(data) {
    // Clear previous content
    const chartContainer = d3.select("#chart");
    chartContainer.html("");

    // Your code for Scene 1: Display an overview chart with some annotations
    // For example, you can create a bar chart showing player count per nationality
    // Add annotations to highlight interesting insights in the data

    // ... (scene 1 code)

    // Scene 1 Annotations
    const annotationScene1 = [
        // Annotation for an interesting data point or trend
        { note: { label: "Tooltip for interesting point" }, // Add more info here if needed
          data: { nationality_name: "Country A", count: 50 },
          dx: 50, dy: -50, // Offset from the data point
          subject: { radius: 5 } // Highlight the data point
        },
        // Add more annotations as needed
    ];

    // Draw Scene 1 Annotations
    const makeAnnotations = d3.annotation()
        .type(d3.annotationCalloutCircle)
        .annotations(annotationScene1);

    d3.select("#chart svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations);

    // Add any other scene-specific code and annotations for Scene 1
}

// Function to create and display Scene 2
function displayScene2(data) {
    // Clear previous content
    const chartContainer = d3.select("#chart");
    chartContainer.html("");

    // Your code for Scene 2: Display a different chart or visualization with annotations
    // For example, a scatter plot showing player height and weight
    // Add annotations to provide context and insights about the scatter plot

    // ... (scene 2 code)

    // Scene 2 Annotations
    const annotationScene2 = [
        // Annotation for a specific data point or trend
        { note: { label: "Tooltip for specific point" }, // Add more info here if needed
          data: { height_cm: 170, weight_kg: 60 },
          dx: 50, dy: -50, // Offset from the data point
          subject: { radius: 5 } // Highlight the data point
        },
        // Add more annotations as needed
    ];

    // Draw Scene 2 Annotations
    const makeAnnotations = d3.annotation()
        .type(d3.annotationCalloutCircle)
        .annotations(annotationScene2);

    d3.select("#chart svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations);

    // Add any other scene-specific code and annotations for Scene 2
}

// Function to create and display Scene 3
function displayScene3(data) {
    // Clear previous content
    const chartContainer = d3.select("#chart");
    chartContainer.html("");

    // Your code for Scene 3: Another chart or visualization with annotations
    // For example, a line chart showing player ages over time
    // Add annotations to highlight important trends or events

    // ... (scene 3 code)

    // Scene 3 Annotations
    const annotationScene3 = [
        // Annotation for an important trend or event
        { note: { label: "Tooltip for trend or event" }, // Add more info here if needed
          data: { year: "2020", age: 25 },
          dx: 50, dy: -50, // Offset from the data point
          subject: { radius: 5 } // Highlight the data point
        },
        // Add more annotations as needed
    ];

    // Draw Scene 3 Annotations
    const makeAnnotations = d3.annotation()
        .type(d3.annotationCalloutCircle)
        .annotations(annotationScene3);

    d3.select("#chart svg")
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations);

    // Add any other scene-specific code and annotations for Scene 3
}

// Function to trigger the narrative visualization
function triggerNarrativeVisualization() {
    const csvFilePath = 'female_players_legacy.csv';
    d3.text(csvFilePath)
        .then(csvData => {
            const data = parseCSVData(csvData);

            // Display Scene 1
            displayScene1(data);

            // Wait for a few seconds before proceeding to Scene 2
            setTimeout(() => {
                // Display Scene 2
                displayScene2(data);

                // Wait for a few seconds before proceeding to Scene 3
                setTimeout(() => {
                    // Display Scene 3
                    displayScene3(data);
                }, 5000); // Wait for 5 seconds before showing Scene 3
            }, 5000); // Wait for 5 seconds before showing Scene 2
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Call the function to trigger the narrative visualization when the script is loaded
triggerNarrativeVisualization();
