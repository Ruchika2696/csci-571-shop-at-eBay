
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, NgModule } from "@angular/core";
import { MyForm } from './form';
import { HttpClient } from '@angular/common/http';
import {HttpGetService} from './serviceget';
import {FormsModule, ReactiveFormsModule , FormGroup} from '@angular/forms';
import { NgForm } from "@angular/forms/src/directives/ng_form";
import {MatAutocompleteModule, MatInputModule,MatFormFieldModule, MatSelectModule} from '@angular/material';
import { FormControl } from '@angular/forms';
import {ResultTableComponent} from './result-table/result-table.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {PhotosComponent} from './photos/photos.component';
import {SimilarComponent} from './similar/similar.component'
import {ShippingComponent} from './shipping/shipping.component';
import {SellerComponent} from './seller/seller.component';
import {WishListComponent} from './wish-list/wish-list.component';

@Component ({
   selector: 'my-form',
   templateUrl: './form.component.html',
   providers: [HttpGetService, ResultTableComponent, ProductDetailComponent, PhotosComponent, SimilarComponent, ShippingComponent, SellerComponent,WishListComponent]
})

export class MyEbayForm implements OnInit {
  zips:any;
  bar:boolean=false;
  resultTable: any;
  submitted: boolean = false;
  wishActive:boolean=false;
  myzip:any;
  currentZip:any=null;
  notFound:boolean = false;
 // resultActive:boolean = true;
  getResultUrl : string = "";
  j:number = 0;
  k:number = 0;
  
  distance: number = 10;
   myControl = new FormControl();
   constructor(private httpClient: HttpClient, private showresult: ResultTableComponent, private product: ProductDetailComponent, private photo: PhotosComponent, private shipping: ShippingComponent){
   this.myControl = new FormControl();
   this.showresult = showresult;
   
   }
   model:MyForm = new MyForm("",-1,false,false,false,false,false,10,true,false,null);

     ngOnInit() {

     this.httpClient.get('http://ip-api.com/json').subscribe(data => {
     this.myzip = data['zip'];
     this.currentZip = this.myzip;

      console.log(data);
      console.log(this.myzip);
    });
  

     

     localStorage.clear();
     this.get_zipData(this);
     //this.resultTable = null;
    console.log("Hieeeeeee");
    //this.submitted = false;
  
  }

  clearAll(){
    this.resultTable = undefined;
    localStorage.clear();
    this.wishActive=false;
    
  }
  setZip(opt){
    this.model.zip = opt;
  }

  newForm() {
    this.model = new MyForm("",-1,false,false,false,false,false,10,true,false,null);
  }

  onSubmit(){
    this.submitted = true;
    console.log("hello from result table");

    if(this.model.distance){
      this.distance = this.model.distance;
    }

    if(this.model.other){
      this.currentZip = this.model.zip;
    }
    else{
      this.currentZip = this.myzip;
    }

   



      this.httpClient.get('https://cscinodebackend.appspot.com/getResultTable?keyword='+ (this.model.keyword) + '&distance='+(this.distance) +'&newone='+(this.model.newone)+'&used='+(this.model.used)+'&unspecified='+(this.model.unspecified)+'&buyerPostalCode='+(this.currentZip)+'&free='+(this.model.free)+'&local='+(this.model.local)+'&category='+(this.model.category)).subscribe((data:any)=>{
    
      this.notFound = false;
      this.resultTable = data.findItemsAdvancedResponse[0].searchResult[0].item;
      
      //this.resultActive = false;
      console.log("result table is");
      console.log(this.resultTable)
      if(this.resultTable == undefined){
        this.notFound = true;
      }
      
        });


  }


  showBar(){


    this.bar=true;
    console.log("bar is"); console.log(this.bar);
      
      setTimeout(()=>{ this.bar = false; console.log("bar is"); console.log(this.bar);}, 1000);
    
  
  }
  activateWishList(){
  this.wishActive = true;
  
  }

   deactivateWishList(){
  this.wishActive = false;
  
  }

   get_zipData(curr){
        this.httpClient.get('https://cscinodebackend.appspot.com/getAPIResponse?curr='+curr).subscribe((res: any)=>{
           //console.log(res);
            this.zips = res;
            console.log(this.zips)
        });
    }

    

 
  }
    

