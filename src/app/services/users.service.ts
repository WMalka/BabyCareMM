import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Users } from "../models/user.model";
import { Baby } from "../models/baby.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  api = "http://localhost:50888/api/";
  constructor(private http: HttpClient) {}
  public userChanged: Subject<string> = new Subject<string>();
  getBabies(): Observable<Baby[]> {
    return this.http.get<Baby[]>(this.api+"babies/getBabies");
  }

  getBabyById(babyId: string): Observable<Baby> {
    return this.http.get<Baby>(this.api+"babies/getBabyById/"+babyId);
  }
  addBaby(baby: Baby): Observable<Baby> {
    return this.http.post<Baby>(this.api+"babies/addBaby",baby);
  }
  updateBaby(babyId: string,baby: Baby): Observable<Baby> {
    return this.http.put<Baby>(this.api+"babies/updateBaby/"+babyId,baby);
  }
  deleteBaby(babyId: string): Observable<null> {
    return this.http.delete<null>(this.api+"babies/deleteBaby/"+babyId);
  }
  //sends tz and password to server and gets back the user or null.
  login(tz: string, password: string): Observable<Users> {
    return this.http.get<Users>(this.api+"users/login/" + tz + "/" + password);
  }
  postData(arr: number[],user:Users): Observable<Users> {
    return this.http.post<Users>(this.api+"users/postData" , {arr:arr, user:user});
  }
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.api+"users/getUsers");
  }
}
