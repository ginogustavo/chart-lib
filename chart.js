/* new canvajs */
window.onload = function () {
  var options = {
    title: {
      text: "Worldwide Fatalities 2020",
    },
    axisX: {
      title: "Fatalities",
    },
    axisY: {
      title: "Total",
    },
    subtitles: [
      {
        text: "Source: www.worldometers.info", // subtitle 1
      },
    ],
    // showInLegend: true,
    legend: {
      horizontalAlign: "left", // "center" , "right"
      verticalAlign: "center", // "top" , "bottom"
      fontSize: 15,
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column", //"",

        dataPoints: [
          // { label: "Mothers during birth", y: 193308 },
          { label: "Seasonal flu", y: 305277 },
          { label: "Malaria", y: 613458 },
          { label: "Suicides", y: 670661 },
          { label: "Covid-19", y: 771532 },
          { label: "Traffic", y: 844249 },
          { label: "HIV / AIDS", y: 1051360 },
          { label: "Alcohol", y: 1564219 },
          { label: "Smoking", y: 3126465 },
          { label: "Cancer", y: 5136476 },
        ],
      },
    ],
  };

  $("#chartContainer").CanvasJSChart(options);
};

/* pie chart graph */
var chartSelector = "#chart";
/**
 * Selector used to get label elements inside the rendered chart.
 * Your mileage may vary if you configure your chart different than
 * me. Use Firebug or Developer Tools to step through the SVG and
 * determine your label selector.
 */
var labelSelector = "> g:eq(1) g text";

/**
 * This is our data. For simplicity sake, doing inline and not AJAX.
 */
var data = [
  ["Breast", 279100],
  ["Lung", 228820],
  ["Prostate", 191930],
  ["Colon", 174950],
  ["Others", 958790],
];
// Load Google Charts
google.load("visualization", "1.1", { packages: ["corechart", "line"] });

// Callback when API is ready
google.setOnLoadCallback(function () {
  /*
   * Setup the data table with your data.
   */
  var table = new google.visualization.DataTable({
    cols: [
      { id: "name", label: "Name", type: "string" },
      { id: "value", label: "Value", type: "number" },
    ],
  });

  // Add data to the table
  table.addRows(data);

  // Google Charts needs a raw element. I'm using jQuery to get the chart
  // Container, then indexing into it to get the raw element.
  var chartContainer = $(chartSelector)[0];

  // Create the Google Pie Chart
  var chart = new google.visualization.PieChart(chartContainer);

  // Draw the chart.
  chart.draw(table, {
    title: "Top Cancer types ending in death - 2020. Source: seer.cancer.gov",
  });

  /*
   * This is the meat and potatoes of the operation. We really require
   * two things: #1) A selector that will get us a list of labels in the
   * legend, and #2) The DataTable powering the chart.  We'll cycle
   * through the labels, and use their index to lookup their value.
   * If you have some higher-level math you need to do to display a
   * different value, you can just replace my logic to get the count
   * with your's.
   */

  // The <svg/> element rendered by Google Charts
  var svg = $("svg", chartContainer);

  /*
   * Step through all the labels in the legend.
   */
  $(labelSelector, svg).each(function (i, v) {
    /*
     * I'm retrieving the value of the second column in my data table,
     * which contains the number that I want to display. If your logic
     * is more complicated, change this line to calculate a new total.
     */
    var total = table.getValue(i, 1);

    // The new label text.
    var newLabel = $(this).text() + " (" + total + ")";

    // Update the label text.
    $(this).text(newLabel);
  });
});
