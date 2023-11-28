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
        radius: markerSize(feature.properties.mag),
        color: "black",
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

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}