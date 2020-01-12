// from data.js
var tableData = data;

// YOUR CODE HERE!
// select the filter type
var filterType = d3.select("#filter-type");

var filterTypeValue = d3.select("#filter-type-value");

// Select the submit button
var submit = d3.select("#filter-btn");


// Get a reference to the table body
var tbody = d3.select("tbody");

// Console.log the alients data from data.js
console.log(tableData);
autoPopulate(tableData);

function autoPopulate(tableData) {

    // Use d3 to automatically populate tableData by creating table rows
// and cells.

tableData.forEach((alients) => {
    // Creating table rows for each row of alients data
    var row = tbody.append("tr");
    //Iterating thru each row for key and values
    Object.entries(alients).forEach(([key, value]) => {
        // Creating cells for posting table data
        var cell = row.append("td");
        cell.text(value);
    });
});

}



//function to invoke on selection of an item from dropdown
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

// Function to invoke on clicking the filter button
submit.on("click", function() {
        
        // Prevent the page from refreshing
        d3.event.preventDefault();

        // Clearing the previous table data
        tbody.html("");

        //get the data entered in text box
        var inputElement = d3.select("#filtertype");
         
        var inputValue = inputElement.property("value");
        
        if (inputValue == '') {
            alert("Please enter a filter value!");
            document.getElementById("#filtertype").focus();
            autoPopulate(tableData);
        }
        
        //Filter the data based on the input value
        var typeVal = d3.select("label").attr("for");
        
        var filteredData = tableData.filter(alients => alients[typeVal] === inputValue.toLowerCase());
        if (filteredData.length == 0) {
            alert("Oops..No UFO's found, try another filter value!");
            d3.select("#filtertype").node().value = '';
            autoPopulate(tableData);
        }
        console.log(filteredData);
        
        //Displaying the data for the selection
        filteredData.forEach((alients) => {
            // Creating table rows for each row of alients data
            var row = tbody.append("tr");
            //Iterating thru each row for key and values
            Object.entries(alients).forEach(([key, value]) => {
                // Creating cells for posting table data
                var cell = row.append("td");
                cell.text(value);
            });
        });



})
