var map, pointsOnMap, mapStyle;

mapStyle = [
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "saturation": 36
      },
      {
        "color": "#000000"
      },
      {
        "lightness": 40
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "on"
      },
      {
        "color": "#000000"
      },
      {
        "lightness": 16
      }
    ]
  },
  {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 17
      },
      {
        "weight": 1.2
      }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 20
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 21
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 17
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 29
      },
      {
        "weight": 0.2
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 18
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 16
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 19
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "all",
    "stylers": [
      {
        "lightness": "19"
      },
      {
        "gamma": "1.00"
      },
      {
        "hue": "#00ffc5"
      },
      {
        "saturation": "0"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "weight": "0.01"
      },
      {
        "color": "#65e7b6"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      },
      {
        "saturation": "-5"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "transit.station.rail",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "lightness": 17
      }
    ]
  }
]

pointsOnMap = [
    [50.453000, 30.445960, 1, {
        'head'    : 'Учебный центр «QAStartUP»',
        'address' : 'Адрес: Вадима Гетьмана, 1-Б',
        'tel'     : 'Телефон: (096) 255-45-49, (093) 615-30-90'
    }],
];

// Function return array of markers that was create from "locations" and added to "map"
function setMarkers(map, locations) {
    var markers = [];
    var image = new google.maps.MarkerImage('img/svg/map-marker.svg', null, null, null, new google.maps.Size(40,58));
    for (var i = 0; i < locations.length; i++) {
        var point    = locations[i];
        var myLatlng = new google.maps.LatLng(point[0], point[1]);
        var marker   = new google.maps.Marker({
            position : myLatlng,
            map      : map,
            icon     : image,
            title    : point[3].head,
            zIndex   : point[2]
        });
        marker.infoContent = point[3];
        markers.push(marker);
    }
    return markers;
}

// After function is complete all marker in array will contain object with info for infowindow
function setInfoWindowContent(arrayOfMarkers, infoWindow) {
    for (var i = 0; i < arrayOfMarkers.length; i++) {
        google.maps.event.addListener(arrayOfMarkers[i], 'click', function() {
            var content = composeInfoWindowContent(this.infoContent);
            infoWindow.setContent(content);
            infoWindow.open(map, this);
        });
    }
}

function composeInfoWindowContent(data) {
    return '<ul class="marker-info">' +
            '<li class="marker-info__head">'     + data.head    + '</li>' +
            '<li class="marker-info__address">'  + data.address + '</li>' +
            '<li class="marker-info__tel">'      + data.tel     + '</li>' +
        '</ul>';
    }

window.initMapInContactsArea = function initMap() {
    var mapOptions = {
        zoom: 16,
        disableDefaultUI: true,
        scrollwheel: false,
        center: new google.maps.LatLng(50.454870, 30.435763),
        styles: mapStyle
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var mapMarkers = setMarkers(map, pointsOnMap);
    var mapInfoWindow = new google.maps.InfoWindow();

    setInfoWindowContent(mapMarkers, mapInfoWindow);
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3' +
      '&signed_in=false&callback=initMapInContactsArea';
    document.body.appendChild(script);
}

module.exports = loadScript;


