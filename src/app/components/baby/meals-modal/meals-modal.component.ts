import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Baby } from "src/app/models/baby.model";
import { Meals } from "src/app/models/meal.model";
import { MealType } from "src/app/models/mealType.model";
import { NurseService } from "src/app/services/nurse.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-meals-modal",
  templateUrl: "./meals-modal.component.html",
  styleUrls: ["./meals-modal.component.css"],
})
export class MealsModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MealsModalComponent>,
    private nurseService: NurseService
  ) {}
  mealsTypes: MealType[] = [];
  mealId = 0;
  form = this.fb.group({
    DateTime:  this.fb.control(new Date().toISOString().substring(0, 16), [Validators.required]),
    Note: this.fb.control("", [Validators.required]),
    Id: this.fb.control(""),
    Baby_Id: this.fb.control(""),
    Meals_Type_Id: this.fb.control(""),
  });
  babyId = "";
  meal: Meals;
  baby = new Baby();
  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.mealId = this.data.id;
      this.nurseService.GetMealsById(this.mealId).subscribe((x) => {
        this.form = this.fb.group(x);
      });
    }
    if (this.data && this.data.babyId) {
      this.babyId = this.data.babyId;
      this.nurseService.GetBabyByIdentity(this.data.babyId).subscribe((currentBaby) => {
        this.baby = currentBaby;
      })
      
    }
    this.nurseService.GetMealsType().subscribe((mealsT) => {
      this.mealsTypes = mealsT;
    });
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: "Order" });
    }
  }
  saveMeal() {
    const meal = <Meals>this.form.value;
    if (this.mealId === 0) {
      meal.Baby_Id = this.babyId;
      this.nurseService.AddMeals(meal).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה", "success").then(() => {
          this.close();
        });
      });
    } else {
      this.nurseService.UpdateMeals(meal).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה", "success").then(() => {
          this.close();
        });
      });
    }
  }
}
