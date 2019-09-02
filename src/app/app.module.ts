import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {MyEbayForm} from './form.component';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule, MatInputModule,MatFormFieldModule, MatSelectModule} from '@angular/material';
import { ResultTableComponent } from './result-table/result-table.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { PhotosComponent } from './photos/photos.component';
import { ShippingComponent } from './shipping/shipping.component';
import { SellerComponent } from './seller/seller.component';
import { SimilarComponent } from './similar/similar.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { WishListComponent } from './wish-list/wish-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    MyEbayForm,
    ResultTableComponent,
    ProductDetailComponent,
    PhotosComponent,
    ShippingComponent,
    SellerComponent,
    SimilarComponent,
    WishListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
     
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatInputModule,
    NgxPaginationModule,
    RoundProgressModule
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
