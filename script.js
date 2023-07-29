// Function to fetch data from the CSV file
function getData() {
    return d3.csv("C:/Users/srinj/Downloads/archive3/female_playerslegacy.csv", (d) => {
      return {
        nationality: d.nationality,
      };
    });
  }
  
  // Function to create the bar graph
  async function createBarGraph() {
    const data = await getData();
  
    // Count the number of players from each nationality
    const nationalityCounts = {};
    data.forEach((d) => {
      nationalityCounts[d.nationality] = (nationalityCounts[d.nationality] || 0) + 1;
    });
  
    // Convert the nationalityCounts object to an array of objects
    const nationalityData = Object.keys(nationalityCounts).map((nationality) => ({
      nationality,
      count: nationalityCounts[nationality],
    }));
  
    // Set up the dimensions and margins for the chart
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    // Create the SVG element
    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // Define the x and y scales
    const xScale = d3.scaleBand()
      .domain(nationalityData.map((d) => d.nationality))
      .range([0, width])
      .padding(0.2);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(nationalityData, (d) => d.count)])
      .range([height, 0]);
  
    // Create the bars
    svg.selectAll(".bar")
      .data(nationalityData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.nationality))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d.count))
      .attr("height", (d) => height - yScale(d.count));
  
    // Add x-axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");
  
    // Add y-axis
    svg.append("g")
      .call(d3.axisLeft(yScale));
  
    // Add axis labels
    svg.append("text")
      .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Nationality");
  
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Number of Players");
  }
  
  // Call the createBarGraph function to generate the bar graph
  createBarGraph();
  
