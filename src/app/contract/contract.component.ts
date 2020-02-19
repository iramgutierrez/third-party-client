import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';



@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  public user:any;
  public code:string;
  public step:number = 1;
  public error:string = '';
  public availability:any;

  public arrivalDate:string;
  public departureDate:string;
  public adultNumber:string;
  public availabilities:any[]

  public passengers:{
    name:string,
    surname:string,
    age:string
  }[];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}')
  }

  checkAvailability () {
    this.error = '';

    this.dataService.checkAvailability({
      productId: this.route.snapshot.paramMap.get('id'),
      arrivalDate: this.arrivalDate,
      departureDate: this.departureDate,
      adultNumber: this.adultNumber
    }).subscribe((data: any)=> {
      this.availabilities = data.availability;
      this.step = 2;
      this.createPassengers(this.adultNumber)
    }, error => {
      if (error.status === 400) {
        try {
          this.error = Object.values(error.error.errors).shift()[0]
        } catch (e) {
          this.error = 'Server error'
        }
      } else {
        try {
          this.error = error.error.error
        } catch (e) {
          this.error = 'Server error'
        }
      }
    })  
  }

  contract (availability) {
    this.step = 3;
    this.availability = availability
  }

  createPassengers (adultNumber) {
    this.passengers = []
    for (let a = 0; a < adultNumber; a++) {
      this.passengers.push({
        name: '',
        surname: '',
        age: ''
      })
    }

    if (this.passengers.length) {
      this.passengers[0].name = this.user.name;
      this.passengers[0].surname = this.user.lastname;
    }
  }


  booking () {
    const data = {
      "adultNumber": this.adultNumber,
      "arrivalDate": this.arrivalDate,
      "departureDate": this.departureDate,
      "futureBookingState": this.availability.futureBookingState,
      "productId": this.route.snapshot.paramMap.get('id'),
      "sellContract": this.availability.sellContract.code,
      "sellTariff": this.availability.sellTariff.code,
      "sellPriceSheet": this.availability.sellPriceSheet.code,
      "sellCurrency": this.availability.sellCurrency.code,
      "modality": this.availability.modality.code,
      "passengers": this.passengers
    }

    this.error = '';

    this.dataService.booking(data)
      .subscribe((data: any)=> {
        this.code = data.code;
        this.step = 4;
      }, error => {
        if (error.status === 400) {
          try {
            this.error = Object.values(error.error.errors).shift()[0]
          } catch (e) {
            this.error = 'Server error'
          }
        } else {
          try {
            this.error = error.error.error
          } catch (e) {
            this.error = 'Server error'
          }
        }
      }) 
  }

}
