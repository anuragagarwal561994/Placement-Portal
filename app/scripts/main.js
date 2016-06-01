function initMap() {
  var daiict = {
    location: {
      lat: 23.1885,
      lng: 72.6284
    },
    placeId: 'ChIJ60cRwDwqXDkRocrkR8Uuwiw'
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    center: daiict.location,
    zoom: 15,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    fullscreenControl: true,
    scrollwheel: false
  });

  var widgetDiv = document.getElementById('widget');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(widgetDiv);

  var service = new google.maps.places.PlacesService(map);
  service.getDetails({placeId: daiict.placeId}, function (details, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      var googleMaps = 'https://www.google.com/maps';
      var navLink = details.name + ',' + details.formatted_address;
      var dirLink = googleMaps + '/dir//' + navLink.replace(/\s/g, '+');
      var searchLink = googleMaps + '?ll=' + daiict.location.lat + ',' + daiict.location.lng +
        '&z=16&cid=3225191708000307873';

      var rating = '', i, r = Math.floor(details.rating);
      for (i = 0; i < r; i++) {
        rating += '<i class="material-icons md-12">star</i>';
      }
      if (details.rating - r > 0) {
        i++;
        rating += '<i class="material-icons md-12">star_half</i>';
      }
      for (; i < 5; i++) {
        rating += '<i class="material-icons md-12">star border</i>';
      }

      widgetDiv.innerHTML =
        '<strong>' + details.name + '</strong>' +
        '<p>' + details.formatted_address + '</p>' +
        '<div class="review-box"><span class="rating">' + details.rating + '</span>' + rating + '</div>' +
        '<div class="map-link">\
            <a href=' + dirLink + ' target=_blank>\
                                    <i class="material-icons">directions</i>Get Directions\
                                </a>\
                            </div>' +
        '<div class="map-link">\
            <a href=' + searchLink + ' target=_blank>\
                                    <i class="material-icons">map</i>View larger map\
                                </a>\
                            </div>';

      var saveWidget = new google.maps.SaveWidget(widgetDiv, {
        place: daiict,
        attribution: {
          source: 'Dhirubhai Ambani Institute of Information and Communication Technology',
          webUrl: 'http://www.daiict.ac.in'
        }
      });

      new google.maps.Marker({
        map: map,
        position: saveWidget.getPlace().location
      });
    }
  });
}

$(document).ready(function() {

  // Init Material scripts for buttons ripples, inputs animations etc, more info on the next link https://github.com/FezVrasta/bootstrap-material-design#materialjs
  $.material.init();
  
});
