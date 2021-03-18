import { Component, OnInit } from '@angular/core';
import { iPrice } from 'src/app/interfaces';
import { RestCallsService } from 'src/app/services/rest-calls.service';

//https://timdeschryver.dev/blog/google-maps-as-an-angular-component

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  zoom = 12;
  center: google.maps.LatLngLiteral
 // center = {
  //  lat: position.coords.latitude,
  //  lng: position.coords.longitude,
  //}
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }


  restError: boolean=false;
  restErrorMessage: string="";
  prices: iPrice[];
  hourPrice: number;
  cleanUpPrice: number;
  barCrewPrice: number;
  lat = 51.678418;
  lng = 7.809007;

  constructor(private restCallsService: RestCallsService) { }

  ngOnInit(): void {
    this.getAllPrices();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
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
