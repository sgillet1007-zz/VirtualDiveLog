$(document).on('ready', function(){
// initialize the map
var map = L.map('leaflet-map').setView([15,-68],4);

// initialize global diveTally
var diveTally = 1;

//initialize global diveTimeTotal for hours dived
var diveTimeTot = 0;
//version of diveTime global rounded to tenths
var diveTimeTotR = 0;

//initialize array for air consumption values
var airConsArray = [];
//initialized global airConsumpAvg for avg 
var airConsAvg = 0;

map.on('click', onMapClick);

// create empty array to place currentDive objects into
var myDiveArray = [];

// vv***** load mapbox tile layer *************
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'sgillet1007.1e5d6005',
    accessToken: 'pk.eyJ1Ijoic2dpbGxldDEwMDciLCJhIjoiMzQ4ZWE5YWNlZDQ3NmEzMzY0ZTk4ZDc2MWJjMWFjMDkifQ.M3cCfmaaAVzdYQfQ3fIDoQ'
}).addTo(map);

// dive time helper function. inputs start and end time strings. returns a number (minutes the dive lasted).
var diveTime = function(timeIn,timeOut){
    var hoursIn = Number(timeIn.slice(0,2));
    var minsIn = Number(timeIn.slice(3));
    var startMins = (hoursIn*60)+minsIn;
    var hoursOut = Number(timeOut.slice(0,2));
    var minsOut = Number(timeOut.slice(3));
    var endMins = (hoursOut*60)+minsOut;
    var diveMins = endMins - startMins;
    return diveMins;
}

// psi consumed helper function. inputs start and end psi strings. returns a number (psi used).
var psiUsed = function(psiIn, psiOut){
    var psiIn = Number(psiIn);
    var psiOut = Number(psiOut);
    var psiUsed = psiIn - psiOut;
    return psiUsed;
}

// avg air consumption helper consumption
var arrayAvg = function(array){
    var airSum = 0;
    for (var i=0;i<array.length;i++){
        airSum += array[i];
    }
    var output = Math.round(airSum/diveTally);
    return output
}

//helper function to round to one decimal place
var roundTenths = function(num){
    var output = Math.round(num*10)/10;
    return output
}

// listner for New Dive button click
$('.new-form-button').on('click',function(){   
    // shows form when New Dive button is clicked
    $('.form-wrapper').show(1000);
    // reset form input values
    $('.input-date').val(undefined);
    $('.input-location').val(undefined);
    $('.input-timeIn').val(undefined);
    $('.input-timeOut').val(undefined);
    $('.input-verifNo').val(undefined);
    $('.input-salt').val(undefined);
    $('.input-notes').val(undefined);
})

//vv*** start onMapClick() function **************
function onMapClick(e) {
    // display input form
        var id = diveTally;
        var diveString = "Dive #" + diveTally;
        var date = $('.input-date').val();
        var location = $('.input-location').val();
        var type = $('.input-type').val();
        var maxDepth =$('.input-maxDepth').val();
        var viz = $('.input-viz').val();
        var wTemp = $('.input-wTemp').val();
        var timeIn = $('.input-timeIn').val();
        var timeOut = $('.input-timeOut').val();
        var psiStart = $('.input-psiStart').val();
        var psiEnd = $('.input-psiEnd').val();
        var verifNo = $('.input-verifNo').val();
        var saltW = $('.input-salt').val(); 
        var notes =$('.input-notes').val();
        var diveMins = diveTime(timeIn,timeOut);
        var psiConsumed = psiUsed(psiStart,psiEnd); 
        var diveHours = (diveMins/60);
        var diveAirCons = (psiConsumed/diveMins);
        var diveAirConsR = Math.round(diveAirCons);
       
    // create a geoJson object called currentDive
    var currentDive = {
        "type":"Feature",
        "properties": {
            "id": diveString,
            "popupContent": diveString+"<br>"+date+"<br>"+location,
            "headerContent": diveString + '&nbsp || &nbsp' + location + '&nbsp || &nbsp' + date,
            "date": date,
            "location":location,
            "typeD":type,
            "maxDepth": maxDepth,
            "viz": viz,
            "wTemp": wTemp,
            "timeIn":timeIn,
            "timeOut":timeOut,
            "psiStart":psiStart,
            "psiEnd":psiEnd,
            "verifNo":verifNo,
            "saltW":saltW,
            "notes":notes,
            "diveMins":diveMins,
            "psiUsed":psiConsumed,
            "diveHours":diveHours,
            "diveAirCons":diveAirCons,
            "diveAirConsR":diveAirConsR,
        },
        "geometry": {
            "type":"Point",
            "coordinates": [e.latlng.lng,e.latlng.lat],
        }
    }
// specify popup options 

    myDiveArray.push(currentDive);
    var marker = L.marker([e.latlng.lat,e.latlng.lng]).addTo(map);
    marker.bindPopup(""+currentDive.properties.popupContent).openPopup();

    airConsArray.push(currentDive.properties.diveAirCons);
    airConsAvg = arrayAvg(airConsArray);

    diveTimeTot += currentDive.properties.diveHours;
    diveTimeTotR = roundTenths(diveTimeTot);

    // if divTally > 1, replaces stats values instead of appending values.
    if (diveTally === 1){
        $('.diveTime-stat').after('<p class="stats-val dt">' + ' ' + diveTimeTotR + '</p>');
        $('.airCons-stat').after('<p  class="stats-val ac">' + ' ' + airConsAvg + '</p>');
    }
    else {
        $('.dt').replaceWith('<p class="stats-val dt">' + ' ' + diveTimeTotR + '</p>');
        $('.ac').replaceWith('<p  class="stats-val ac">' + ' ' + airConsAvg + '</p>');
    }

    ++diveTally;

    // hide form
    $('.form-wrapper').hide(1000);

    $('#log-book').prepend('<div class="log-record"><div class="log-record-header"><div class="bloghead">'+ currentDive.properties.headerContent +'</div></div><div class="log-record-details"><div class="row"><div class="col-sm-4"></div><div class="col-sm-4"><strong>'+ currentDive.properties.id +'</strong></div><div class="col-sm-4"></div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Time In: </strong>' + currentDive.properties.timeIn + '</div><div class="col-sm-3"><strong> Time Out:  </strong>'+ currentDive.properties.timeOut + '</div><div class="col-sm-6"><strong> Dive Duration (mins): </strong>'+ currentDive.properties.diveMins + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Max. Depth:  </strong>'+ currentDive.properties.maxDepth + '</div><div class="col-sm-3"><strong> Visibility (ft): </strong>'+ currentDive.properties.viz + '</div><div class="col-sm-6"><strong> Water Temp. (F): </strong>'+ currentDive.properties.wTemp + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp psi Start: </strong>'+ currentDive.properties.psiStart + '</div><div class="col-sm-3"><strong> psi End: </strong>'+ currentDive.properties.psiEnd + '</div><div class="col-sm-6"><strong> Air Consumption Rate (psi/min): </strong>'+ currentDive.properties.diveAirConsR + '</div></div><div class="row"><div class="col-sm-3"><strong>&nbsp Dive Type: </strong>'+ currentDive.properties.typeD + '</div><div class="col-sm-3"><strong> Water Type: </strong>'+ currentDive.properties.saltW + '</div><div class="col-sm-6"><strong> Verification #: </strong>'+ currentDive.properties.verifNo + '</div></div><div class="row"><div class="col-sm-12"><strong>&nbsp Notes: </strong>'+ currentDive.properties.notes + '</div></div></div></div>');
}; //******************* ^^^ end onMapClick() function ^^^ ***********************

// delegated event adds. when this was inside mapclick and not delegated, a listener got added to each header on each map click
$(document).on('click','.log-record-header',function(){
        $(this).siblings().toggle(600);
})

// ****Zoom button JQ click handlers ******************vv
$('.default-zoom').on('click',function(){
    map.setView([15,-68],4);
})
$('.coz-zoom').on('click',function(){
    map.setView([20.437307950568957,-86.91352844238281],10);
})
$('.global-zoom').on('click',function(){
    map.setView([5,-1],2);
})
$('.gbr-zoom').on('click',function(){
    map.setView([-18.7295,150.8642],5);
})
$('.cuba-zoom').on('click',function(){
    map.setView([20.437307950568957,-75],6);
})
$('.cura-zoom').on('click',function(){
    map.setView([12.17,-68.7],8);
})
// *************************************************^^

})