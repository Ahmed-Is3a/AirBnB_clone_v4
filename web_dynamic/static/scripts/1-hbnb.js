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
});
