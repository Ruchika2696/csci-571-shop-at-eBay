import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
@Input() productPhotos: any;

  constructor() { }

  ngOnInit() {
  console.log("phhotos are");
      console.log(this.productPhotos);
  }

}
