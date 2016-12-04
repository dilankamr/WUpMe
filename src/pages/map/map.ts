import { Component, ViewChild, ElementRef  } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {

  x: number = 0;
  y: number = 0;
  marker: any = undefined;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {
    this.loadMap();
  }

  loadMap() {

    Geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(position.coords.latitude + " " + position.coords.longitude)
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }


  showMyLocation() {

    Geolocation.watchPosition().subscribe((position: Position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.x = position.coords.latitude;
      this.y = position.coords.longitude;
      // alert(position.coords.latitude + " " + position.coords.longitude);
      if (this.marker == undefined) {
        console.log("marker Undefined");

        this.marker = new google.maps.Marker({
          map: this.map,
          icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22, 22),
            new google.maps.Point(0, 18),
            new google.maps.Point(11, 11)),
          position: latLng
        });
        let content = "<h4>You are here</h4>";
        this.addInfoWindow(this.marker, content);
      }
      else {
        console.log("marker defined");
        this.marker.setPosition(latLng);
      }


    }, (err) => {
      console.log(err);
    });
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }


  // onError(error) {
  //   alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  // }
  //
  // onSuccess(position) {
  //   var lat = position.coords.latitude;
  //   var long = position.coords.longitude;
  //   var myLatlng = new google.maps.LatLng(lat, long);
  //   var iconimage = new google.maps.MarkerImage('images/current_location_small.png',
  //     new google.maps.Size(15, 15),
  //     new google.maps.Point(0, 0),
  //     new google.maps.Point(7, 7)
  //   );
  //   this.marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: this.map,
  //     icon: iconimage
  //   });
  //   this.marker.setMap(this.map);
  //
  //   // console.log("marker null");
  //   // this.marker.setPosition(myLatlng);
  // };

}
