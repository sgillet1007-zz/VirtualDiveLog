$(document).on('ready', function(){
// initialize the map
var map = L.map('leaflet-map').setView([15,-68],4);
// vv*****  GLOBAL VARIABLES *********************
var diveTally = 1;
var editMap = 0;
var myDivePts = L.geoJson(); //myDivePts is a geoJson layer
myDivePts.addTo(map);
// ^^*********************************************
map.on('click', onMapClick);
// vv***** load tile layer *************
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'sgillet1007.1e5d6005',
    accessToken: 'pk.eyJ1Ijoic2dpbGxldDEwMDciLCJhIjoiMzQ4ZWE5YWNlZDQ3NmEzMzY0ZTk4ZDc2MWJjMWFjMDkifQ.M3cCfmaaAVzdYQfQ3fIDoQ'
}).addTo(map);
// ^^*********************************************
// vv***** editMap button click handler **********
$('.edit-map').on('click', function(){
    console.log('button clicked');
    if (!editMap){
        editMap;
    }
    else{
        !editMap;
    }
});
// ^^**********************************************
//vv***************** start onMapClick() function ***********************
function onMapClick(e) {
    // if (editMap){
    var diveNo = "Dive #" + diveTally
    
    // create a geoJson object called currentDive
    var currentDive = {
        "type":"Feature",
        "properties": {
            "id": diveNo,
            "popupContent": diveNo +'!'
        },
        "geometry": {
            "type":"Point",
            "coordinates": [e.latlng.lng,e.latlng.lat]
        }
    }
    // currentDive.bindPopup(currentDive.properties.popupContent);
    // add currentDive to myLayer
    myDivePts.addData(currentDive);

    // Adds .log-entry div to #logbook with content = diveTally
    $('#log-book').append('<div class="log-entry">'+ currentDive.properties.id 
                            +'<br>Lat: '+ currentDive.geometry.coordinates[1]
                            + '<br>Long: '+currentDive.geometry.coordinates[0]+'</div>');
    ++diveTally;
// }
}; //******************* ^^^ end onMapClick() function ^^^ ***********************




})