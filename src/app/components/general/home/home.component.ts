import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { iPrice } from 'src/app/interfaces';
import { RestCallsService } from 'src/app/services/rest-calls.service';

//https://timdeschryver.dev/blog/google-maps-as-an-angular-component

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 13;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 2,
  }
  markers = [];
  infoContent = '';


  restError: boolean=false;
  restErrorMessage: string="";
  prices: iPrice[];
  hourPrice: number;
  cleanUpPrice: number;
  barCrewPrice: number;


  constructor(private restCallsService: RestCallsService) { }

  successCallback(position) {
    console.log("succes: " + position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    this.center = {lat: position.coords.latitude, lng: position.coords.longitude };
  }

  errorCallback(error) {
    console.log("fail: " + error);
  }

  ngOnInit(): void {
    this.getAllPrices();

    this.center = {lat: 25.13194, lng: 55.11667};
    navigator.geolocation.getCurrentPosition(this.successCallback,this.errorCallback,{timeout:2000});
    this.addMarker(this.center.lat, this.center.lng);

  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  addMarker(nLat:number, nLng:number) {
    console.log("nLat: " + nLat);
    this.markers.push({
      position: {
        lat: nLat,
        lng: nLng,
      },
      label: {
        color: 'yellow',
        text: 'Our Venue',
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        //animation: google.maps.Animation.BOUNCE,
      },
    })
  }

  openInfo(marker: MapMarker, content) {
    console.log("open");
    this.infoContent = content
    this.info.open(marker)
  }
  
  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  populatePriceControls(){
    for (let price of this.prices) {
      if ("cleanUpPrice".toLowerCase() === price.priceType.toLowerCase()) {
        this.cleanUpPrice = price.price;
      }
      if ("hourPrice".toLowerCase() === price.priceType.toLowerCase()) {
        this.hourPrice = price.price;
      }
      if ("barCrewPrice".toLowerCase() === price.priceType.toLowerCase()) {

        this.barCrewPrice = price.price;
      }
    }
  }

  getAllPrices() {
    this.restError = false;
    this.restErrorMessage = "";

    this.restCallsService.getAllPrices()
      .subscribe(
        response => {
          this.prices = response as iPrice[];
          this.populatePriceControls();
          //console.log(this.allStatus);
        },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        })
      }
}
