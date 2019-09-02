import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { NgForm } from "@angular/forms/src/directives/ng_form";
import {MatAutocompleteModule, MatInputModule,MatFormFieldModule, MatSelectModule} from '@angular/material';
import { FormControl } from '@angular/forms';
//import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {trigger, transition, animate, keyframes, group, state, style} from '@angular/animations';
import { Meta } from '@angular/platform-browser';




@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css'],
 // providers: [ProductDetailComponent],

  animations: [ trigger('flyInOut',[ transition('void => fly' ,[style({ transform: 'translateX(-100%)' }), animate('1s')] ),
                                    transition('* => fade' ,[ animate('1s', style({transform: 'translateX(100%)'}) )
      
                                  ])
             ])
             ]
})

export class ResultTableComponent implements OnInit {
showTable : boolean = true;



toggleDiv(){
  this.showTable = this.showTable ? false : true;
}

constructor(private httpClient: HttpClient) {

//this.product = product;

}
  
  //resultTable: any;
submitFlag:boolean;
productDetail: any;
shortTitle:any; 
detailActive:any;
productPhotos: any;
similarItem:any;
detailFlag:boolean;
ship:any;
canReturn: boolean;
seller: any;
store:any;
productTitle:any;
currentId: any;
currentPrice:any;
p: number=1;
 productActive:any;
  photosActive:any;
  shippingActive:any;
  sellerActive:any;
  similarActive:any;
  currentData:any;
  currentPhoto:any;
  notFound:boolean=false;
  isopen:any;
  notFoundSeller:boolean = false;
  notFoundShip: boolean = false;
 // shipData: any;
  

@Input() resultTable: any;

  
  ngOnInit() {

      this.detailFlag=false;
      this.detailActive=false;
      
     this.productActive = true;
      this.photosActive=false;
      this.shippingActive=false;
      this.sellerActive=false;
      this.similarActive = false;
      
      if(this.detailActive){
        this.isopen = 'fly';
      }

    console.log("Hieeeeeee to result table");
   
    console.log("Inside on init");
    console.log(this.resultTable);
    console.log(this.productDetail)  
  
  
  }
  isPresent(id){
    if(localStorage.hasOwnProperty(id)){
      return true;
    }
    else{
      return false
    }
  }

  isAbsent(id){
   if(!localStorage.hasOwnProperty(id)){
      return true;
    }
    else{
      return false
    }
  
  }
  openPhoto(image){
    var win = window.open(image, '_blank');
     win.focus();
  }

 

  
  enable_list(){
    this.detailActive=false;
  }
  enable_details(){
  this.detailActive=true;
  this.make_all_inactive();
  this.productActive=true;
  
  }

  showDetail(id, title, rowdata){
  this.detailFlag=true;
  this.detailActive=true;
   this.productActive = true;
      this.photosActive=false;
      this.shippingActive=false;
      this.sellerActive=false;
      this.similarActive = false;
      this.currentId = id;
      this.currentData = rowdata;
      this.isopen = true;
      

    this.toggleDiv();
    console.log("hello from product detail");
     this.shortTitle = rowdata.title[0];
      //this.welcome="Welcome";
          this.httpClient.get('https://cscinodebackend.appspot.com/getProductDetail?id='+id).subscribe(data=>{
          // this.ship = this.data.Item.shippingInfo
          this.productDetail = data;
          if(this.productDetail == undefined ){
            this.notFound = true;
          }
          else{
         
          

          console.log("details of product are in rs.ts");
          console.log(this.productDetail);
           this.ship = rowdata.shippingInfo
          this.seller = rowdata.sellerInfo;
          this.store = this.productDetail.Item.Storefront;
          console.log("store is in result table");
          console.log(this.store);
          console.log("shipping is");
          console.log(this.ship);
          this.canReturn = rowdata.returnsAccepted;
          console.log(title);
          console.log(id);
          this.productTitle = rowdata.title[0];
          this.currentPrice = rowdata.sellingStatus[0].currentPrice[0]._value_;
          this.currentPhoto = rowdata.viewItemURL;
         if(this.ship == undefined){
           this.notFoundShip = true
         }
         else{
           this.notFoundShip = false;
         }
         if(this.seller == undefined){
           this.notFoundSeller = true;
         }
         else{
           this.notFoundSeller = false;
         }


         }

          


        });

        

        this.httpClient.get('https://cscinodebackend.appspot.com/getProductPhotos?title='+title).subscribe(data=>{
          this.productPhotos = data;
          console.log("photos in result table are:");
          console.log(this.productPhotos);
          });

          this.httpClient.get('https://cscinodebackend.appspot.com/getSimilarItems?id='+id).subscribe(data=>{
          this.similarItem = data;
          console.log("similar items are are:");
          console.log(this.similarItem.getSimilarItemsResponse);
          });

  }
  
    make_all_inactive(){
  this.productActive=false;
  this.photosActive=false;
  this.shippingActive=false;
  this.sellerActive=false;
  this.similarActive = false;

  
  }

  activate(i){
    this.make_all_inactive();
    switch(i){

     case 1:{
       this.productActive = true;
       break;
     }
     case 2:{
       this.photosActive=true;
       break;
     }
     case 3:{
        this.shippingActive=true;
        break;
     }
     case 4:{
        this.sellerActive=true;
        break;
     }
     case 5:{
       this.similarActive=true;
       break;
     }


    }


  }

  isInList(id){
  if( (localStorage.getItem(id)!= undefined) && (localStorage.getItem(id) != "") && (localStorage.getItem(id)!= null) ){
    return true;
  }
  else{
    return false;
  }
  }

addTowish(rowdata){
  localStorage.setItem(rowdata.itemId[0], JSON.stringify(rowdata));
  console.log("added");
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.getItem(localStorage.key(i)));
}
  //console.log(localStorage);
}
removeFromWish(rowdata){
  localStorage.removeItem(rowdata.itemId[0]);
  console.log("removed");
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.getItem(localStorage.key(i)));
}
}



}
