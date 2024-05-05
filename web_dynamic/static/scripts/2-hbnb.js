$(document).ready(function() {
    var amenities = {}; // Object to store checked amenities by ID

    $('.amenity').change(function() {
        var amenityId = $(this).val(); // Get the value (Amenity ID)
        if ($(this).is(':checked')) {
            amenities[amenityId] = $(this).parent().text().trim(); // Store amenity using ID as key
        } else {
            delete amenities[amenityId]; // Remove amenity from object
        }
        updateAmenitiesDisplay();
    });

    function updateAmenitiesDisplay() {
        var text = Object.values(amenities).join(', '); // Join all values into a comma-separated string
        $('h4').text('Selected Amenities: ' + text); // Update the text of the <h4> element
    }

    // Function to check the status of the API and update the UI accordingly
    function checkApiStatus() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/status/', // URL of the API
            success: function(response) {
                if (response.status === "OK") {
                    $('#api_status').addClass('available'); // Add 'available' class if status is OK
                } else {
                    $('#api_status').removeClass('available'); // Remove 'available' class otherwise
                }
            },
            error: function() {
                $('#api_status').removeClass('available'); // Remove 'available' class if API request fails
            }
        });
    }

    // Call the function to check API status when the page is ready
    checkApiStatus();
});
