// from data.js
var tableData = data;

// YOUR CODE HERE!
// select the filter type
var filterType = d3.select("#filter-type");

var filterTypeValue = d3.select("#filter-type-value");

// submit button
var submit = d3.select("#filter-btn");


// Get a reference to the table body
var tbody = d3.select("tbody");

// Console.log the aliens data from data.js
console.log(tableData);
autoPopulate(tableData);

function autoPopulate(tableData) {

//  Create table rows and cells.

tableData.forEach((UFO) => {
    // Creating table rows for each row of alients data
    var row = tbody.append("tr");
    //Iterating thru each row for key and values
    Object.entries(UFO).forEach(([key, value]) => {
        // Creating cells for posting table data
        var cell = row.append("td");
        cell.text(value);
    });
});

//dropdown
filterType.on("change", function() {
    var filterValue = filterType.property("value");
    d3.select("#filtertype").node().value = '';


    // Setting placeholder values for input text
    switch (filterValue) {
        case 'datetime':
            placeHolder = '1/1/2010';
            break;
        case 'city':
            placeHolder = 'city';
            break;
        case 'state':
            placeHolder = 'state';
            break;
        case 'country':
            placeHolder = 'country';
            break;
        case 'shape':
            placeHolder = 'shape';
            break;
        default:
            placeHolder = '';
    }
    d3.select("input").attr("placeholder", placeHolder);
    d3.select("label")
      .attr("for",filterValue)
      .text(`Enter a value for  ${filterValue.toUpperCase()}`);

    
});

// Clicking the filter button
submit.on("click", function() {
        
        // stop page refreshing
        d3.event.preventDefault();

        // Clear former table data
        tbody.html("");

        //Enter text
        var inputElement = d3.select("#filtertype");
         
        var inputValue = inputElement.property("value");
        
        if (inputValue == '') {
            alert("Please enter a filter value!");
            document.getElementById("#filtertype").focus();
            autoPopulate(tableData);
        }
        
        //Filter the data based
        var typeVal = d3.select("label").attr("for");
        
        var filteredData = tableData.filter(alients => alients[typeVal] === inputValue.toLowerCase());
        if (filteredData.length == 0) {
            alert("Oops..No UFO's found, try another filter value!");
            d3.select("#filtertype").node().value = '';
            autoPopulate(tableData);
        }
        console.log(filteredData);
        
        //Displaying the data for the selection
        filteredData.forEach((UFO) => {
            // Creating table rows for each row of alients data
            var row = tbody.append("tr");
            //Iterating thru each row for key and values
            Object.entries(UFO).forEach(([key, value]) => {
                // Creating cells for posting table data
                var cell = row.append("td");
                cell.text(value);
            });
        });



})
