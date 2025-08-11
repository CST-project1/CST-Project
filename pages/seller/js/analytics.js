// Function to toggle the sidebar visibility
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
  }
    // Sales Chart configiration
    // Get the drawing context for the sales chart 
    let salesChart = document.getElementById('salesChart').getContext('2d');
    // Create a new line chart for Sales
    new Chart(salesChart, {
        type: 'line', // The type of chart we want to create is a line chart
        data: { 
            // Labels for the X-axis (months)
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Sales ($)', // title shown above the chart 
                data: [1200, 1500, 1700, 2000, 2500, 3000],   // Y-axis values
                backgroundColor: 'rgba(156,39,176,0.1)',
                borderColor: '#818fea',
                fill: true,  // the chart will fill the area under the line
                tension: 0.4  // Curve smoothness ((0) value meaning straight lines)
            }]
        }
    });

    // top selling products chart
    // Get the drawing context for the productsChart
    let productsChart = document.getElementById('productsChart').getContext('2d');
    // Create a doughnut chart for top-selling products
    new Chart(productsChart, {
        type: 'doughnut', // The type of chart we want to create is a doughnut chart
        data: { 
            labels: ['Rose Elegance', 'Golden Mist', 'Stranger with you', 'Vanilla Bliss'],
            datasets: [{
                 // Market share (percentages or counts)
                data: [40, 25, 20, 15],
                backgroundColor: ['#9c27b0', '#f8bbd0', '#ff9800', '#4caf50']
            }]
        }
        });



    