import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {trigger, transition, animate, keyframes, group, state, style} from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
    animations: [ trigger('flyInOut',[ transition('void => *' ,[style({ transform: 'translateX(-100%)' }), animate('1s')] ),
                                    transition('* => void' ,[ animate('1s', style({transform: 'translateX(100%)'}) )
      
                                  ])
             ])
             ]
})

export class ProductDetailComponent implements OnInit {

  @Input() productDetail: any;
  
 

  detailFlag:boolean;
  currentItemId: any;
  currentItemTitle:any;
  showImages:boolean;
  ishandleDay:boolean;
  isexpedite: boolean;
  isoneday: boolean;
  isreturn: boolean;
  public dummy: string;
  public images: any = [];
  items: Array<any> = [];
  constructor(private modalService: NgbModal){}

  ngOnInit() {
      console.log("in product detail ts");
     
      console.log(this.productDetail);
      this.dummy = "hello";
      
      
    for (var i = 0; i < this.productDetail.Item.PictureURL.length; i++){
    
    this.images.push(this.productDetail.Item.PictureURL[i]);
   
    
}
    console.log("images are");
    console.log(this.images);
  }

  enableImages(){
    this.showImages = true;
  }

  disableImages(){
    this.showImages = false;
  }

open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }




  
  }








