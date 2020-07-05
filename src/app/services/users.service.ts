import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
//import { Http ,HttpModule} from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  getUsers() {
   return this.http.get("http://localhost:52238/api/users/getUsers");
  }
  getBabies() {
    return this.http.get("http://localhost:52238/api/babies/getBabies");
   }
}
