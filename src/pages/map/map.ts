import { Component, ViewChild, ElementRef  } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {
  private APIKEY: string = "AIzaSyCjyYMax_Ug025BmDORJu9xVJ_3fT_mPJ8";
  targetLocation = ""
  marker: any = undefined;
  geocoder: any;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('targetlocation') targetlocation: ElementRef;
  map: any;

  constructor(public navCtrl: NavController) {
    this.loadMap();
    this.geocoder = new google.maps.Geocoder();
  }

  ngAfterViewInit() {
    var input = <HTMLInputElement>document.getElementsByClassName("searchbar-input")[0];
    var autocomplete = new google.maps.places.Autocomplete(input);
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
    let options = { 'maximumAge': 10000, 'timeout': 2000, 'enableHighAccuracy': true };
    Geolocation.watchPosition(options).subscribe((position: Position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      if (this.marker == undefined) {
        this.marker = new google.maps.Marker({
          map: this.map,
          // icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
          //   new google.maps.Size(22, 22),
          //   new google.maps.Point(0, 18),
          //   new google.maps.Point(11, 11)),
          position: latLng
        });
        let content = "<h4>You are here</h4>";
        this.addInfoWindow(this.marker, content);
      }
      else {
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

  addTragetLocation(targetLocation) {
    var input = <HTMLInputElement>document.getElementsByClassName("searchbar-input")[0];

    var address = input.value;
    // this.targetLocation = "";
    // this.geocoder.geocode({ 'address': address }, function(results, status) {
    //   if (status == 'OK') {
    //     console.log(results);
    //     this.map.setCenter(results[0].geometry.location);
    //     var marker = new google.maps.Marker({
    //       map: this.map,
    //       position: results[0].geometry.location
    //     });
    //   } else {
    //     alert('Geocode was not successful for the following reason: ' + status);
    //   }
    // });
  }

}
