import { Car } from './models/car';
import { Maker } from './models/maker';
import { CarService } from './service/carService';
import { Component, OnInit } from '@angular/core';
import { makeBindingParser } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'ea-app';
  carShows: any = [];
  public makers: Maker[] = [];
  cars: any = [];

  constructor(public rest: CarService) { }

  ngOnInit() {

    this.rest.getCars().subscribe((data: {}) => {
      console.log(data);
      this.carShows = data;
      this.arrangeCars();
      console.log(this.makers);
    });
  }

  public arrangeCars() {
    const makerList = this.makers;
    this.carShows.forEach(function (carShow: any) {
      const carShowName = carShow.name;
      const cars = carShow.cars;
      cars.forEach(function (car: any) {
        const existingMake: Maker = makerList.find(s => s.make === car.make);
        if (!existingMake) {
          const newMaker = new Maker();
          newMaker.make = car.make;
          newMaker.cars = [];

          const newCar = new Car();
          newCar.model = car.model;
          newCar.motorShows = [];
          newCar.motorShows.push(carShowName);

          newMaker.cars.push(newCar);
          makerList.push(newMaker);
        } else {
          const existingCar = existingMake.cars.find(c => c.model === car.model);
          if (!existingCar) {
            const newCar = new Car();
            newCar.model = car.model;
            newCar.motorShows = [];
            newCar.motorShows.push(carShowName);
          } else {
            existingCar.motorShows.push(carShowName);
          }
        }
      });
    });
  }

}
