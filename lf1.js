$(document).on('ready', function(){
// initialize the map
var map = L.map('leaflet-map').setView([15,-68],4);

// initialize global diveTally
var diveTally = 1;

// initialize empty geoJson
var myDivePts = L.geoJson(); //myDivePts is a geoJson layer

// add geoJson layer to map
myDivePts.addTo(map);

// vv***** load mapbox tile layer *************
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'sgillet1007.1e5d6005',
    accessToken: 'pk.eyJ1Ijoic2dpbGxldDEwMDciLCJhIjoiMzQ4ZWE5YWNlZDQ3NmEzMzY0ZTk4ZDc2MWJjMWFjMDkifQ.M3cCfmaaAVzdYQfQ3fIDoQ'
}).addTo(map);

// runs onMapClick when map is clicked
map.on('click', onMapClick);

//vv*** start onMapClick() function **************
function onMapClick(e) {
    // display input form
    $('.form-wrapper').css('display','inline-block');

    // var id = null;
    // var diveString = null;
    // var date = null;
    // var maxDepth = null;
    // var viz = null;
    // var wTemp = null;
    // var timeIn = null;
    // var timeOut = null;
    // var psiStart = null;
    // var psiEnd = null;
    // var verifNo = null;
    // var saltW = null;
    // var freshW = null;
        var id = diveTally;
        var diveString = "Dive #" + diveTally;
        var date = $('.input-date').val();
        var maxDepth =$('.input-maxDepth').val();
        var viz = $('.input-viz').val();
        var wTemp = $('.input-wTemp').val();
        var timeIn = $('.input-timeIn').val();
        var timeOut = $('.input-timeOut').val();
        var psiStart = $('.input-psiStart').val();
        var psiEnd = $('.input-psiEnd').val();
        var verifNo = $('.input-verifNo').val();
        var saltW = $('.input-salt').val();
        var freshW = $('.input-fresh').val();    
       
        // create a geoJson object called currentDive
    var currentDive = {
        "type":"Feature",
        "properties": {
            "id": diveString,
            "popupContent": diveString,
            "date": date,
            "maxDepth": maxDepth,
            "viz": viz,
            "wTemp": wTemp,
            "timeIn":timeIn,
            "timeOut":timeOut,
            "psiStart":psiStart,
            "verifNo":verifNo,
            "saltW":saltW,
            "freshW":freshW,
        },
        "geometry": {
            "type":"Point",
            "coordinates": [e.latlng.lng,e.latlng.lat],
        }
    }

    myDivePts.addData(currentDive);
    // console.log(myDivePts);
    
    $('.submit-button').on('click',function(){
        // assigns current input values to corresponsding local variables
        // var id = diveTally;
        // var diveString = "Dive #" + diveTally;
        // var date = $('.input-date').val();
        // var maxDepth =$('.input-maxDepth').val();
        // var viz = $('.input-viz').val();
        // var wTemp = $('.input-wTemp').val();
        // var timeIn = $('.input-timeIn').val();
        // var timeOut = $('.input-timeOut').val();
        // var psiStart = $('.input-psiStart').val();
        // var psiEnd = $('.input-psiEnd').val();
        // var verifNo = $('.input-verifNo').val();
        // var saltW = $('.input-salt').val();
        // var freshW = $('.input-fresh').val();
        
        myDivePts.addData(currentDive);
        console.log(myDivePts);
    })

    // Adds .log-entry div to #logbook with content = diveTally
    // TO DO: only do JQ below on submit button on.click...
    // $('#log-book').append('<div class="log-entry">'+ currentDive.properties.popupContent 
    //                             +'<br>Date: '+currentDive.properties.date
    //                             +'<br>Lat: '+ currentDive.geometry.coordinates[1]
    //                             + '<br>Long: '+currentDive.geometry.coordinates[0]
    //                             +'</div>');
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