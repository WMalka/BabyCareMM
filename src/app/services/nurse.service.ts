import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MothersComponent } from '../components/mothers/mothers.component';
import { Baby } from '../models/baby.model';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  api = "http://localhost:50888/api/";
  constructor(private http: HttpClient) {}

  getAllBabies(): Observable<Baby[]> {
    return this.http.get<Baby[]>(this.api+"babies/getBabies");
  }
  
}
