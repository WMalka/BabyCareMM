import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { MothersComponent } from "../components/mothers/mothers.component";
import { Baby } from "../models/baby.model";
import { Baths } from "../models/baths.model";
import { DiaperChange } from "../models/diaperChange.model";
import { Meals } from "../models/meal.model";
import { MealType } from "../models/mealType.model";
import { Treatments } from "../models/treatments.model";
import { TreatmentType } from "../models/treatmentType.model";
import { Users } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class NurseService {
  api = "http://localhost:50888/api/";
  constructor(private http: HttpClient) {}

  getAllBabies(): Observable<Baby[]> {
    return this.http.get<Baby[]>(this.api + "babies/getBabies");
  }
  GetBabiesWitNoMeal(): Observable<Baby[]> {
    return this.http.get<Baby[]>(this.api + "babies/GetBabiesWitNoMeal");
  }
  getBabiesByMotherId(motherId:string): Observable<Baby[]> {
    return this.http.get<Baby[]>(this.api + "babies/getBabiesByMotherId/"+motherId);
  }
  UpdateNote(baby: Baby): Observable<boolean> {
    return this.http.post<boolean>(this.api + "babies/UpdateNote", baby);
  }
  GetBabyById(babyId: string): Observable<Baby>{
    return this.http.get<Baby>(this.api + "babies/GetBabyById/"+babyId)
  }
  GetBabyByIdentity(babyId: string): Observable<Baby>{
    return this.http.get<Baby>(this.api + "babies/GetBabyByIdentity/"+babyId)
  }
  
  //Meals
  GetMealsByBabyId(babyId: string): Observable<Meals[]> {
    return this.http.get<Meals[]>(
      this.api + "meals/GetMealsByBabyId/" + babyId
    );
  }
  GetMealsById(id: number): Observable<Meals> {
    return this.http.get<Meals>(this.api + "meals/GetMealsById/" + id);
  }
  AddMeals(meal: Meals): Observable<Meals> {
    return this.http.post<Meals>(this.api + "meals/AddMeals", meal);
  }
  UpdateMeals(meal: Meals): Observable<Meals> {
    return this.http.post<Meals>(this.api + "meals/UpdateMeals", meal);
  }
  DeleteMeals(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.api + "meals/DeleteMeals/" + id);
  }
  // End Meals

  //Bath
  GetBathByBabyId(babyId: string): Observable<Baths[]> {
    return this.http.get<Baths[]>(this.api + "baths/GetBathByBabyId/" + babyId);
  }
  GetBathById(id: number): Observable<Baths> {
    return this.http.get<Baths>(this.api + "baths/GetBathById/" + id);
  }
  AddBath(bath: Baths): Observable<Baths> {
    return this.http.post<Baths>(this.api + "baths/AddBath", bath);
  }
  UpdateBath(bath: Baths): Observable<Baths> {
    return this.http.post<Baths>(this.api + "baths/UpdateBath", bath);
  }
  DeleteBath(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.api + "baths/DeleteBath/" + id);
  }
  // End Bath

  //DiaperChange
  GetDiaperChangeByBabyId(babyId: string): Observable<DiaperChange[]> {
    return this.http.get<DiaperChange[]>(
      this.api + "diaperChanges/GetDiaperChangeByBabyId/" + babyId
    );
  }
  GetDiaperChangeById(id: number): Observable<DiaperChange> {
    return this.http.get<DiaperChange>(
      this.api + "diaperChanges/GetDiaperChangeById/" + id
    );
  }
  AddDiaperChange(diaperChange: DiaperChange): Observable<DiaperChange> {
    return this.http.post<DiaperChange>(
      this.api + "diaperChanges/AddDiaperChange",
      diaperChange
    );
  }
  UpdateDiaperChange(diaperChange: DiaperChange): Observable<DiaperChange> {
    return this.http.post<DiaperChange>(
      this.api + "diaperChanges/UpdateDiaperChange",
      diaperChange
    );
  }
  DeleteDiaperChange(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.api + "diaperChanges/DeleteDiaperChange/" + id
    );
  }
  // End Bath

  //Treatments
  GetTreatmentsByBabyId(babyId: string): Observable<Treatments[]> {
    return this.http.get<Treatments[]>(
      this.api + "treatments/GetTreatmentByBabyId/" + babyId
    );
  }
  GetTreatmentsById(id: number): Observable<Treatments> {
    return this.http.get<Treatments>(
      this.api + "treatments/GetTreatmentById/" + id
    );
  }
  AddTreatments(treatment: Treatments): Observable<Treatments> {
    return this.http.post<Treatments>(
      this.api + "treatments/AddTreatment",
      treatment
    );
  }
  UpdateTreatments(treatment: Treatments): Observable<Treatments> {
    return this.http.post<Treatments>(
      this.api + "treatments/UpdateTreatment",
      treatment
    );
  }
  DeleteTreatments(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.api + "treatments/DeleteTreatments/" + id
    );
  }
  // End Bath

  GetMealsType(): Observable<MealType[]> {
    return this.http.get<MealType[]>(this.api + "MealsType/GetMealsType");
  }
  GetMealTypeById(id:number): Observable<MealType> {
    return this.http.get<MealType>(this.api + "MealsType/GetMealTypeById/"+id);
  }
  AddMealType(mealType: MealType): Observable<MealType> {
    return this.http.post<MealType>(
      this.api + "MealsType/AddMealType",
      mealType
    );
  }
  UpdateMealType(mealType: MealType): Observable<MealType> {
    return this.http.post<MealType>(
      this.api + "MealsType/UpdateMealType",
      mealType
    );
  }


  GetTreatmentType(): Observable<TreatmentType[]> {
    return this.http.get<TreatmentType[]>(this.api + "TreatmentType/GetTreatmentType");
  }
  AddTreatmentType(treatment: TreatmentType): Observable<TreatmentType> {
    return this.http.post<TreatmentType>(
      this.api + "TreatmentType/AddTreatmentType",
      treatment
    );
  }
  UpdateTreatmentType(treatment: TreatmentType): Observable<TreatmentType> {
    return this.http.post<TreatmentType>(
      this.api + "TreatmentType/UpdateTreatmentType",
      treatment
    );
  }

  GetTreatmentTypeById(id:number): Observable<TreatmentType> {
    return this.http.get<TreatmentType>(this.api + "TreatmentType/GetTreatmentTypeById/"+id);
  }
}
