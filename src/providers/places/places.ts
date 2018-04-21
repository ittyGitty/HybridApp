import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {


  private GOOGLE_API_KEY = "AIzaSyDubqmTpMg959ffqTOX8rta9s-zYlr1BBM";

  constructor(public http: HttpClient) {
   

  }

  getAddressBasedOnLatLng(lat: number, lng: number){
    return new Promise((resolve, reject) => {
      this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${this.GOOGLE_API_KEY}`)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        )
    });
  }

}
