import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
//import { Http ,HttpModule} from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http: HttpClient) { }
  getMeal() {
    return this.http.get("http://localhost:52238/api/meal/getMeal");
  }
  getBabies() {
    return this.http.get("http://localhost:52238/api/babies/getBabies");
  }
}
