import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';



@Injectable()
export class HttpGetService {
  constructor (
    private http: HttpClient

  ) {}
  getZipData(){
    return this.http.get('http://api.geonames.org/postalCodeSearchJSON?postalcode_startsWith=900&username=joshir&country=US&maxRows=5');
  }


}
