import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { NgForm } from "@angular/forms/src/directives/ng_form";
import {MatAutocompleteModule, MatInputModule,MatFormFieldModule, MatSelectModule} from '@angular/material';
import { FormControl } from '@angular/forms';
//import {ProductDetailComponent} from '../product-detail/product-detail.component';
import {trigger, transition, animate, keyframes, group, state, style} from '@angular/animations';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
   animations: [ trigger('flyInOut',[ transition('void => *' ,[style({ transform: 'translateX(-100%)' }), animate('1s')] ),
                                    transition('* => void' ,[ animate('1s', style({transform: 'translateX(100%)'}) )
      
                                  ])
             ])
             ]
})
export class WishListComponent implements OnInit {
productDetail: any;
productPhotos: any;
similarItem:any;
detailFlag:boolean;
ship:any;
canReturn: boolean;
seller: any;
store:any;
productTitle:any;
currentId:any;
currentData:any;
shortTitle:any;
 notFoundSeller:boolean = false;
  notFoundShip: boolean = false;
  notFound:boolean=false;

p: number=1;
 productActive:any;
  photosActive:any;
  shippingActive:any;
  sellerActive:any;
  similarActive:any;
  detailActive:any;
  emptyList:boolean;

  constructor(private httpClient: HttpClient) { }
  wishlist:any;
  total:any = 0;
  public wishData: any = [];
  ngOnInit() {
  if(localStorage.length == 0){
    this.emptyList = true;
  }
  else{
    this.emptyList = false;
  }
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.getItem(localStorage.key(i)));
    this.wishData.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    
}
for(var i=0; i<this.wishData.length;i++){
  this.total += parseFloat(this.wishData[i].sellingStatus[0].currentPrice[0].__value__)
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

 /* enable_details(){
  this.detailActive=true;
  this.make_all_inactive();
  this.productActive=true;
  
  }*/
  addTowish(rowdata){
  localStorage.setItem(rowdata.itemId[0], JSON.stringify(rowdata));
  console.log("added");
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.getItem(localStorage.key(i)));
}
  //console.log(localStorage);
}
  removeFromWish(rowdata){
  this.total = 0;
  localStorage.removeItem(rowdata.itemId[0]);
  console.log("removed");
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.getItem(localStorage.key(i)));
}
this.wishData = [];
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.getItem(localStorage.key(i)));
    this.wishData.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    
}
for(var i=0; i<this.wishData.length;i++){
  this.total += parseFloat(this.wishData[i].sellingStatus[0].currentPrice[0].__value__)
}
}

openPhoto(image){
    var win = window.open(image, '_blank');
  win.focus();
  }


  
  
  enable_list(){
    this.detailActive=false;
    this.similarActive = false;
    this.photosActive = false;
    this.sellerActive=false;
    this.shippingActive = false;
    this.productActive=false;
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
      this.currentData = rowdata;
      this.currentId = id;  

    //this.toggleDiv();
    console.log("hello from product detail");
     this.shortTitle = rowdata.title[0];
      //this.welcome="Welcome";
          this.httpClient.get('https://cscinodebackend.appspot.com/getProductDetail?id='+id).subscribe(data=>{
          // this.ship = this.data.Item.shippingInfo
          this.ship = rowdata.shippingInfo
          this.seller = rowdata.sellerInfo;
          this.store = rowdata.storeInfo;
          console.log("shipping is");
          console.log(this.ship);
          this.canReturn = rowdata.returnsAccepted;
          this.productDetail = data;
          if(this.productDetail == undefined ){
            this.notFound = true;
          }
          else{
          console.log("details of product are in rs.ts");
          console.log(this.productDetail);
          console.log(title);
          console.log(id);
          this.productTitle = rowdata.title[0];
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

}
