import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MothersComponent } from '../components/mothers/mothers.component';
import { Baby } from '../models/baby.model';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecreteryService {

  api = "http://localhost:50888/api/";
  constructor(private http: HttpClient) {}
  public userChanged: Subject<string> = new Subject<string>();
  getBabies(): Observable<Baby[]> {
    return this.http.get<Baby[]>(this.api+"babies/getBabies");
  }
  getAllMothers() {
    return this.http.get<Users[]>(this.api+"users/GetAllMothers");
  }
  GetAllNurses() {
    return this.http.get<Users[]>(this.api+"users/GetAllNurses");
  }
  deleteNurse(userId: number){
    return this.http.delete<boolean>(this.api+"users/deleteNurse/"+userId);


  }

  deleteMother(userId: number, notes: string){
    return this.http.delete<boolean>(this.api+"users/deleteMother/"+userId+"/"+notes);


  }
  getMotherById(id: number){
    return this.http.get<Users>(this.api+"users/getMotherById/"+id);
  }
  getNurseById(id: number){
    return this.http.get<Users>(this.api+"users/GetNurseById/"+id);
  }
  
  getBabyById(babyId: string): Observable<Baby> {
    return this.http.get<Baby>(this.api+"babies/getBabyById/"+babyId);
  }
  addBaby(baby: Baby): Observable<Baby> {
    return this.http.post<Baby>(this.api+"babies/addBaby",baby);
  }
  addMother(mother: Users): Observable<Users> {
    return this.http.post<Users>(this.api+"users/addMother",mother);
  }
  updateMother(mother: Users): Observable<boolean> {
    return this.http.post<boolean>(this.api+"users/updateMother",mother);
  }
  addNurse(nurse: Users): Observable<Users> {
    return this.http.post<Users>(this.api+"users/addNurse",nurse);
  }
  updateNurse(nurse: Users): Observable<boolean> {
    return this.http.post<boolean>(this.api+"users/updateNurse",nurse);
  }

  

  
}
