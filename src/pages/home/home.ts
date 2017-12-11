import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  active = 'decimal';
  decimal = {
    latitude: '0.00000',
    longitude: '0.00000',
  };
  dms = {
    latitude: {
      direction: 'N',
      degrees: 0,
      minutes: 0,
      seconds: '0.0',
    },
    longitude: {
      direction: 'E',
      degrees: 0,
      minutes: 0,
      seconds: '0.0',
    }
  };
  constructor(
    public navCtrl: NavController
  ) {
    
  }

  setActive(type) {
    this.active = type;
    console.log(this.active);
  }

  convertDMStoDecimal(coords) {
    let decimal = parseFloat(coords.degrees) + parseFloat(coords.minutes)/60 + parseFloat(coords.seconds)/3600;
    if(coords.direction === 'W' || coords.direction === "S") {
      decimal = decimal * (-1);
    }
    return decimal.toString();
  }
  convertDecimalToDMS(coords, type) {
    let coordsObj = {
      direction: 'E',
      degrees: 0,
      minutes: 0,
      seconds: '0.0',
    };
    if(coords < 0 && type === 'lat') {
      coordsObj.direction = 'S';
    } else if(coords > 0 && type === 'lat') {
      coordsObj.direction = 'N';
    } else if(coords > 0 && type === 'long') {
      coordsObj.direction = 'E';
    } else if(coords < 0 && type === 'long') {
      coordsObj.direction = 'W';
    }
    coords = Math.abs(coords);
    coordsObj.degrees = Math.trunc(coords);
    coordsObj.minutes = Math.trunc((coords - coordsObj.degrees) * 60);
    coordsObj.seconds = ((((coords - coordsObj.degrees) * 60) - coordsObj.minutes) * 60).toFixed(3);
    return coordsObj;  
  }

  calculate() {
    this.decimal.latitude = this.decimal.latitude.replace(/,/i, ".")
    this.decimal.longitude = this.decimal.longitude.replace(/,/i, ".")
    
    if(this.active === 'dms') {
      this.decimal.latitude = this.convertDMStoDecimal(this.dms.latitude);
      this.decimal.longitude =  this.convertDMStoDecimal(this.dms.longitude);
    } else if(this.active === 'decimal') {
      this.dms.latitude = this.convertDecimalToDMS(this.decimal.latitude, 'lat');
      this.dms.longitude =  this.convertDecimalToDMS(this.decimal.longitude, 'long');
    }
  }
}
