import { Component, OnInit, Input } from '@angular/core';
import {Sort} from '@angular/material';
import { Similar } from './similar';
import { NgForm } from "@angular/forms/src/directives/ng_form";

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {

 @Input() similarItem: any;
 firstHalf:any;
 secondHalf:any;
 all:any;
 show:boolean;

 constructor() {
 //this.sortedData = this.all.slice();
 }
 model:Similar = new Similar('','');
  ngOnInit() {
  
  console.log("similar items in similar component are:");
  console.log(this.similarItem);
  this.all = this.similarItem.getSimilarItemsResponse.itemRecommendations.item;
  this.firstHalf = this.all.slice(0,5);
  this.secondHalf = this.all.slice(5);
  
  }

  showMore(){
  this.show=true;
  
  }

  filterBy(prop: string) {
  return this.all.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
}

  hide(){
    this.show= false;
  }

 

}
