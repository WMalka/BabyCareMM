import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Users } from "src/app/models/user.model";
import { SecreteryService } from "src/app/services/secretery.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-secretery",
  templateUrl: "./secretery.component.new.mother.html",
  //styleUrls: ['./secretery.component.css']
})
export class SecreteryComponentNewMother implements OnInit {
  form: FormGroup;
  Babies: FormArray;
  bloods = ["O+", "O-", "A+", "A-", "B+", "B-", "AB-", "AB+"];
  constructor(
    private formBuilder: FormBuilder,
    private secreteryService: SecreteryService,
    private route: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      Name: ["", Validators.required],
      Email: "",
      Phone: ["", Validators.required],
      UserId: ["", Validators.required],
      DateOfBirth: "",
      Blood_Type: "O+",
      Password: ["", Validators.required],
      Babies: this.formBuilder.array([this.createItem()]),
    });
  }
  createItem(): any {
    return this.formBuilder.group({
      Name: "",
      DateTime_Of_Birth: ["", Validators.required],
      Gender: ["M", Validators.required],
      Blood_type: "O+",
      Note: "",
      Birth_weight: ["", Validators.required],
      BabyId: ["", Validators.required],
      Status: "Active",
    });
  }
  addBaby(): void {
    this.Babies = this.form.get("Babies") as FormArray;
    this.Babies.push(this.createItem());
  }
  removeBaby(i: number): void {
    this.Babies = this.form.get("Babies") as FormArray;
    this.Babies.removeAt(i);
  }
  addMother() {
    const mother = <Users>this.form.value;
    mother.IsMother = true;
    mother.IsNurse = false;
    mother.Status = "Active";
    mother.IsSecretery = false;
    this.secreteryService.addMother(mother).subscribe((x) => {
      if (!x) {
        Swal.fire("Ooooops....", "משהו השתבש", "error").then(() => {});
      } else {
        Swal.fire("", "הנתונים נשמרו בהצלחה", "success").then(() => {
this.route.navigateByUrl('/secretery');

        });
      }
    });
  }
}
