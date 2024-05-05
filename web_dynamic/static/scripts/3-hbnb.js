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

    function loadPlaces() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: '{}',
            dataType: 'json',
            success: function(places) {
                const section = $('.places');
                section.empty(); // Clear existing content
                places.forEach(function(place) {
                    const article = $('<article></article>').html(`
                        <h2>${place.name}</h2>
                        <p>Location: ${place.location}</p>
                    `);
                    section.append(article);
                });
            },
            error: function() {
                console.error('Failed to fetch places');
            }
        });
    }

    function checkApiStatus() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/status/',
            success: function(response) {
                if (response.status === "OK") {
                    $('#api_status').addClass('available');
                } else {
                    $('#api_status').removeClass('available');
                }
            },
            error: function() {
                $('#api_status').removeClass('available');
            }
        });
    }

    checkApiStatus();
    loadPlaces(); // Load places when the page is ready
});
