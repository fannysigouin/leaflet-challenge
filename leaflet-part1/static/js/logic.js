// Store query url for all earthquakes in the past 7 days
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get data from query URL and call createFeatures function
d3.json(url).then(function(earthquakeData) {
    console.log(earthquakeData.features);
    createFeatures(earthquakeData.features);
});

// Define a function to determine the marker size based on the earthquake's magnitude
function markerSize(magnitude) {
    return magnitude * 5;
}

// Define a function to determine the marker colour based on the earthquake's depth
function markerColour(depth) {
    if (depth < 10) {
        return "#006837";
    } else if (depth < 30) {
        return "#AACC00";
    } else if (depth < 50) {
        return "#FFBA08";
    } else if (depth < 70) {
        return "#fd8d3c";
    } else if (depth < 90) {
        return "#bd0026"
    } else {
        return "#6A040F";
    }
}

// Define a function to create the circle markers
function createMarker(feature, latlng) {
    return L.circleMarker(latlng, {
        // call markerSize function
        radius: markerSize(feature.properties.mag),
        color: "black",
        // call markerColour function
        fillColor: markerColour(feature.geometry.coordinates[2]),
        weight: 0.5,
        fillOpacity: 0.75
    });
}

// Define createFeatures function
function createFeatures(earthquakeData) {
    // Define onEachFeature function with feature and layer as parameters
    // to bind a popup to each feature with the earthquake's title, location, magnitude, and depth
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.title}</h3> <hr> <pr>Location: ${feature.properties.place}</pr> <br> <pr>Time: ${new Date (feature.properties.time)}</pr> <br> <pr>Magnitude: ${feature.properties.mag}</pr> <br> <pr>Depth: ${feature.geometry.coordinates[2]}</pr>`);
    }
    
    // Create geoJSON layer, passing the earthquakeData as a parameter and storing it as a variable
    // Call onEachFeature function to add the popups
    // and call createMarker function through pointToLayer option to create the circle markers
    let earthquakes = L.geoJson(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarker
    });

    // Call createMap function with earthquakes variable from geoJSON layer as a parameter
    createMap(earthquakes);
}

// Define createMap function
function createMap(earthquakes) {
    // Create base street layer with OMS tiles
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
    
    // Create the map with the center as the center point of the USA
    // add street and earthquakes as layers
    let myMap = L.map("map", {
        center: [39.8283, -98.5795],
        zoom: 5,
        layers: [street, earthquakes]
    });

    // Base map layer
    let baseMaps = {
        "Street": street
    };

    // Overlay map layer for earthquakes
    let overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create control layer and add to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(myMap);

    // Create the legend
    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        // Add legend to HTML
        let div = L.DomUtil.create("div", "info legend");
        // Set magnitude intervals
        grades = [-10, 10, 30, 50, 70, 90]
        // Add legend info/title to HTML
        let legendInfo = '<h3>Magnitude</h3>';
        div.innerHTML = legendInfo;

        // Loop through magnitude intervals to generate a label with a coloured square based on the markerColour function
        for (let i = 0; i < grades.length; i++) {
            // Display intervals with the coloured square
            div.innerHTML += '<i style="background: ' + markerColour(grades[i]) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'); 
        }
        return div;
    };
    // Add legend to the map
    legend.addTo(myMap);
}