# Leaflet Earthquake Challenge

This repository contains my work for the 15th challenge of the UofT SCS edX Data Bootcamp.

## Background

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. The goal of this challenge was to develop a way to visualize the USGS data, allowing them to better educate the public and other government organizations on issues facing our planet.


## Summary

This challenge was completed by generating an interactive map using Javascript, D3, geoJSON, and Leaflet to visualize earthquakes having occurred in the last seven days. Each marker on the map represents an earthquake, with the size of the marker representing its depth and the colour of the marker representing its magnitude. A legend is also included to represent the different magnitude ranges.

The earthquake data was obtained using the USGS API and D3. The visualization was done by creating various functions:
- `markerSize` and `markerColour` functions were created to generate the markers based on the earthquake's depth and magnitude.
- `createMarker` function was then created to call the `markerSize` and `markerColour` functions and generate the markers at the correct latitude and longitude.
- `createFeatures` function was created to bind a popup to each marker, allowing the user to click on the marker and see information about the earthquake. This function also creates the geoJSON layer and then creates the map by calling the final function below.
- `createMap` function was created to build the map base and overlay layers as well as to create the magnitude legend.

## References

Dataset created by the [United States Geological Survey](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).