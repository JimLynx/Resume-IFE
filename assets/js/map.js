//-----------------------------------------------------------  MAP
//----- MAP TILES
let mapTileLayers = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    //attribution: "Powered by <a href='https://developers.arcgis.com/terms/attribution/' target='_blank' rel='noopener'>Esri</a>"
    // ATTRIBUTION IS MANDATORY! My code is disabled because it's being added automatically by Esri Geosearch Control plugin below.
});



//----- INITIAL MAP SETTINGS (most of these are optional!)
let map = L.map("map", { // "map" is the #div where to build the map in html
    layers: [mapTileLayers], // variable from above
    center: [53.343253, -6.286565], // central lat-lng once loaded
    zoom: 9, // smaller numbers = zoomOut // larger numbers = zoomIn
    minZoom: 1, // max zoomOut permitted
    maxZoom: 18, // max zoomIn permitted
    maxBounds: [ // stops map from infinite scrolling at edges
        [-75, -190],
        [90, 190]
    ],
    maxBoundsViscosity: 0.5, // elastic bounce-back of map edges
});




//----------------------------------------------------------- OVERLAY
// !! must be added after the initial map setup !!
//let mapOverlay = L.tileLayer("http://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}");
//mapOverlay.bringToFront().addTo(map).setZIndex(9);




//----------------------------------------------------------- SEARCH
// Esri Geosearch control: https://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html
let searchControl = L.esri.Geocoding.geosearch().addTo(map);
let results = L.layerGroup().addTo(map);

searchControl.on("results", function (data) {
    for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng).bindPopup(data.results[0].text).bindTooltip(data.results[0].text));

        // zooms out if too far zoomed-in, so the search works globally again
        // otherwise if too zoomed-in, it will search only in current view on screen
        // start: (function by Tim Nelson)
        $(".geocoder-control-input").on("click", function () {
            currentZoom = map.getZoom();
            if (currentZoom > 7) {
                newZoom = 7;
                currentBounds = map.getBounds();
                centLat = (Math.floor(currentBounds._northEast.lat) + Math.floor(currentBounds._southWest.lat)) / 2;
                centLng = (Math.floor(currentBounds._northEast.lng) + Math.floor(currentBounds._southWest.lng)) / 2;
                map.flyTo([centLat, centLng], newZoom);
            }
            results.clearLayers();
        }); // end: (function by Tim Nelson)
    }
});




//----------------------------------------------------------- SCALE
// adds scale/legend in bottom-left corner of map
L.control.scale().addTo(map);




//----------------------------------------------------------- MARKERS + CUSTOM ICONS
// // set variable with Latitute and Longitude, plus any options bindings
// let rioMarker = L.marker([-22.951993, -43.210439]).addTo(map).bindPopup("Christ the Redeemer").bindTooltip("Rio de Janeiro") /*.openPopup()*/ ;
// // set custom icon per marker
// let rioIcon = new L.Icon({
//     iconUrl: "https://raw.githubusercontent.com/TravelTimN/ci-ifd-lead/master/week4-leafletjs/example-project/img/rio.png", // image location
//     iconSize: [50, 50], // image size (width: 50px; height: 50px;)
//     iconAnchor: [25, 50] // sets location of marker respective to LatLng coordinates [X, Y]
// });
// rioMarker.setIcon(rioIcon); // append custom icon to marker



//----------------------------------------------------------- CIRCLES
// creates circles on the map
// the following are for display purposes to show the "maxBounds" locations on this particular map
let swBound = L.circle([-75, -190], { // LatLng of circle
    color: "#000", // stroke color! not fill-color
    opacity: 0.5, // opacity from 0-1
    fillColor: "#f00", // fill-color
    fillOpacity: 0.5, // fill-opacity
    radius: 400000 // radius of circle (extra-large for demo purposes only!)
}).addTo(map).bindPopup("Bottom-Left Bound"); // append circle to "map" #div.

let neBound = L.circle([80, 185], {
    color: "#000",
    opacity: 0.5,
    fillColor: "#f00",
    fillOpacity: 0.5,
    radius: 200000
}).addTo(map).bindPopup("Top-Right Bound");

// let myCircle = L.circle([53.349807, -6.260255], { // LatLng of circle (Dublin Spire)
//     color: "#000", // stroke color
//     opacity: 0.5, // opacity from 0-1
//     fillColor: "#0f0", // fill color
//     fillOpacity: 0.5, // fill opacity
//     radius: 50 // radius of circle
// }).addTo(map).bindPopup("Dublin Spire").bindTooltip("Dublin"); // append circle to "map" #div with pop-up




// //----------------------------------------------------------- POLYLINES
// // single, straight lines from one coordinate to another
// let myPolyline = L.polyline([
//     [-22.951993, -43.210439], // starting coordinates of polyline (Rio)
//     [40.676698, 117.241585] // ending coordinates of polyline (Beijing)
// ], {
//     color: "red", // color can be #HEX, name, RGB(A), etc.
//     weight: 5, // stroke or width of line
//     opacity: 1 // opacity of line
// }).addTo(map).bindPopup("<b>Christ the Redeemer<br>- to -<br>Great Wall of China</b>").bindTooltip("Rio to Beijing [POLYLINE]");
// // append polyline to "map" #div and include pop-up and hover text.




//----------------------------------------------------------- POLYGONS
// custom shapes, not a single line, but an actual shape
// the example below is a "rough" outline of the country *Kazakhstan*
// (apologies to the Kazakh nation for creating new fake borders with neighbors!)
// let myPolygon = L.polygon([
//     [41.791686, 52.532313],
//     [44.613073, 50.300030],
//     [45.962637, 53.090383],
//     [47.042953, 52.462554],
//     [46.228697, 49.567562],
//     [49.276056, 46.533053],
//     [51.780782, 51.032498],
//     [51.216236, 59.717473],
//     [54.072007, 61.356805],
//     [55.321612, 70.425454],
//     [53.869636, 73.317153],
//     [54.304194, 76.736554],
//     [50.953315, 79.947535],
//     [50.986721, 83.119436],
//     [49.184949, 87.481489],
//     [47.220813, 85.740977],
//     [47.220813, 83.005456],
//     [45.330319, 82.264586],
//     [45.008892, 79.871005],
//     [42.283878, 80.191691],
//     [43.272062, 74.235027],
//     [40.716621, 68.437327],
//     [43.655295, 65.110162],
//     [43.564289, 61.955585],
//     [45.597759, 58.496693],
//     [45.046214, 56.011634],
//     [41.321885, 55.497063],
//     [42.403493, 54.075143]
// ]).addTo(map).bindPopup("Kazakhstan").bindTooltip("Kazakhstan [POLYGON]");
// // append the polygon with optional pop-up and hover text





//----------------------------------------------------------- POPUP ON CLICK
// this function will show a pop-up with the exact LatLng coordinates where the user clicks
let popupClick = L.popup();

function onMapClick(e) {
    popupClick
        .setLatLng(e.latlng)
        .setContent("latitude: <b>" + e.latlng.lat.toFixed(5) + "</b><br>longitude: <b>" + e.latlng.lng.toFixed(5) + "</b>")
        .openOn(map);
}
map.on('click', onMapClick); // append pop-up to popupClick variable
