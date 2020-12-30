import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  throwMatDialogContentAlreadyAttachedError,
} from "@angular/material";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Baby } from "src/app/models/baby.model";
import { Users } from "src/app/models/user.model";
import { NurseService } from "src/app/services/nurse.service";
import { UsersService } from "src/app/services/users.service";
import { BathModalComponent } from "../baby/bath-modal/bath-modal.component";
import { BathComponent } from "../baby/bath/bath.component";
import { DiaperChangeComponent } from "../baby/diaper-change/diaper-change.component";
import { MealsModalComponent } from "../baby/meals-modal/meals-modal.component";
import { MealsComponent } from "../baby/meals/meals.component";
import { TreatmentsComponent } from "../baby/treatments/treatments.component";

@Component({
  selector: "app-root",
  templateUrl: "./mothers.component.html",
  styleUrls: ["./mothers.component.css"],
})
export class MothersComponent implements OnInit {
  user: Users;
  babiesArr: Baby[] = [];
  filteredBabies: Observable<Baby[]>;
  form = this.fb.group({
    baby: this.fb.control("", Validators.required),
  });
  mother: Users;
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private userService: UsersService,
    private nurseService: NurseService,
    private fb: FormBuilder
  ) {}
  logout() {
    localStorage.clear();
    this.user = null;
    this.route.navigateByUrl("/home");
    this.userService.userChanged.next();
  }

  private _filterBaby(name: string): Baby[] {
    if (name === "undefined undefined") name = "";
    const filterValue = name.toLowerCase();

    return this.babiesArr.filter(
      (option) => option.Name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  displayFn(b: Baby): string {
    return b && b.Name && b.BabyId ? b.Name + " " + b.BabyId : "";
  }
  openBathModal() {
    const dialogRef = this.dialog.open(BathComponent, {
      data: { babyId: this.form.value.baby.BabyId, motherId: this.mother.Id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openMealsModal() {
    const dialogRef = this.dialog.open(MealsComponent, {
      data: { babyId: this.form.value.baby.BabyId, motherId: this.mother.Id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllBabies();
    });
  }
  openDiaperChangesModal() {
    const dialogRef = this.dialog.open(DiaperChangeComponent, {
      data: { babyId: this.form.value.baby.BabyId, motherId: this.mother.Id },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  openTreatmentsModal() {
    const dialogRef = this.dialog.open(TreatmentsComponent, {
      data: { babyId: this.form.value.baby.BabyId, motherId: this.mother.Id },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  showError() {
    if (!this.form.valid || !this.form.value.baby.Meals) {
      return "";
    }
    if (this.form.value.baby.Meals.length === 0) return "meal-error";

    var now = new Date();
    now.setHours(now.getHours() - 3);
    if (new Date(this.form.value.baby.Meals[0].DateTime) < now)
      return "meal-error";

    return "";
  }
  clear() {
    this.form.patchValue({
      baby: "",
    });
  }

  ngOnInit() {
    this.mother = <Users>JSON.parse(localStorage.getItem("user"));
    this.getAllBabies();
   
  }

  getAllBabies() {
    this.nurseService.getBabiesByMotherId(this.mother.UserId).subscribe((ress) => {
      this.babiesArr = ress;
      this.form.patchValue({
        baby: this.babiesArr[0],
      });
      const us = this.form.get("baby");
      this.filteredBabies = us.valueChanges.pipe(
        startWith(""),
        map((value) =>
          typeof value === "string" ? value : value?.Name + " " + value?.BabyId
        ),
        map((name) => (name ? this._filterBaby(name) : this.babiesArr.slice()))
      );
    });
  }
}
