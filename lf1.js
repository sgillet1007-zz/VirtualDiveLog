$(document).on('ready', function(){
// initialize the map
var map = L.map('leaflet-map').setView([15,-68],4);
// vv*****  GLOBAL VARIABLES *********************
var diveTally = 1;
var mapEdit = false;

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

//vv*** start onMapClick() function **************
function onMapClick(e) {
        // show input form using JQ
    
    $('.form-wrapper').css('display','inline-block');

    var diveNo = "Dive #" + diveTally;
    var date = $('.input-date').val();
        // TO DO add remaining variables to pass to object properties below...
        
        // create a geoJson object called currentDive
    var currentDive = {
        "type":"Feature",
        "properties": {
            "id": diveNo,
            "popupContent": diveNo +'!',
            "date": date,
                // TO DO add remaining properties
        },
        "geometry": {
            "type":"Point",
            "coordinates": [e.latlng.lng,e.latlng.lat],
        }
    }
        // add currentDive to myLayer
    myDivePts.addData(currentDive);

    // Adds .log-entry div to #logbook with content = diveTally
    // TO DO: only do JQ below on submit button on.click...
    $('#log-book').append('<div class="log-entry">'+ currentDive.properties.id 
                                +'<br>Date: '+currentDive.properties.date
                                +'<br>Lat: '+ currentDive.geometry.coordinates[1]
                                + '<br>Long: '+currentDive.geometry.coordinates[0]
                                +'</div>');
    ++diveTally;
}; //******************* ^^^ end onMapClick() function ^^^ ***********************

// Zoom buttone JQ click handlers ******************vv
$('.default-zoom').on('click',function(){
    map.setView([15,-68],4);
})
$('.coz-zoom').on('click',function(){
    map.setView([20.437307950568957,-86.91352844238281],10);
})
$('.global-zoom').on('click',function(){
    map.setView([34.30714385628804,-19.335937499999996],1);
})
// *************************************************^^

})