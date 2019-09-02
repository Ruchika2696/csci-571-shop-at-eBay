import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
@Input() ship: any;
@Input() canReturn: any;
  constructor() { }
  ishandleDay:boolean;
  isexpedite: boolean;
  isoneday: boolean;
  isreturn: boolean;

  ngOnInit() {
  console.log("ships are");
      console.log(this.ship);

  if((this.ship[0].handlingTime[0] == 0 || this.ship[0].handlingTime[0] == 1)){
      this.ishandleDay = true;
    }
    else{
      this.ishandleDay = false;
    }

    if(this.ship[0].expeditedShipping[0] != undefined && this.ship[0].expeditedShipping[0] == true){
      this.isexpedite = true;
    }
    else{
      this.isexpedite = false;
    }

    if(this.ship[0].oneDayShippingAvailable!= undefined && this.ship[0].oneDayShippingAvailable == true){
      this.isoneday = true;
    }
    else{
      this.isoneday = false;
    }

    if(this.canReturn){
      this.isreturn = true;
    }
    else{
      this.isreturn = false;
    }
  }

}
