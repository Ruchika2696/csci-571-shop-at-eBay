import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
@Input() seller: any;
@Input() store:any;
myStar:any;
myStarColor:any;
sellerName:any;

storeUrl: any;
  constructor() { }

  ngOnInit() {
  console.log("seller is");
  console.log(this.seller);
  console.log("store is");
  console.log(this.store);
  
  if(this.seller[0].feedbackScore[0] >= 10000){
    this.myStar =  "stars";
  }
  else{
    this.myStar = "star_border";
  }

  if(this.seller[0].feedbackScore[0]>=10 && this.seller[0].feedbackScore[0]<=49){
    this.myStarColor = "yellow";
  }
  if(this.seller[0].feedbackScore[0]>=50 && this.seller[0].feedbackScore[0]<=99){
    this.myStarColor = "blue"
  }
  if(this.seller[0].feedbackScore[0]>=100 && this.seller[0].feedbackScore[0]<=499){
    this.myStarColor = "turquoise"
  }
  if(this.seller[0].feedbackScore[0]>=500 && this.seller[0].feedbackScore[0]<=999){
    this.myStarColor = "purple"
  }
  if(this.seller[0].feedbackScore[0]>=1000 && this.seller[0].feedbackScore[0]<=4999){
    this.myStarColor = "red"
  }
   if(this.seller[0].feedbackScore[0]>=5000 && this.seller[0].feedbackScore[0]<=9999){
    this.myStarColor = "green"
  }
   if(this.seller[0].feedbackScore[0]>=10000 && this.seller[0].feedbackScore[0]<=24999){
    this.myStarColor = "yellow"
  }
    if(this.seller[0].feedbackScore[0]>=25000 && this.seller[0].feedbackScore[0]<=49999){
    this.myStarColor = "turquoise"
  }
    if(this.seller[0].feedbackScore[0]>=50000 && this.seller[0].feedbackScore[0]<=99999){
    this.myStarColor = "purple"
  }
      if(this.seller[0].feedbackScore[0]>=100000 && this.seller[0].feedbackScore[0]<=499000){
    this.myStarColor = "red"
  }
       if(this.seller[0].feedbackScore[0]>=500000 && this.seller[0].feedbackScore[0]<=999000){
    this.myStarColor = "green"
  }
         if(this.seller[0].feedbackScore[0]>=1000000){
    this.myStarColor = "silver"
  }

 
  this.sellerName = this.seller[0].sellerUserName[0];
  }

}
