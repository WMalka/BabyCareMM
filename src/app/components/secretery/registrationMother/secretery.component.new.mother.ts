import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
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
  Babies: FormArray;
  userIdVal = 0;
  bloods = ["O+", "O-", "A+", "A-", "B+", "B-", "AB-", "AB+"];
  constructor(
    private formBuilder: FormBuilder,
    private secreteryService: SecreteryService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SecreteryComponentNewMother>
  ) {}
  form = this.formBuilder.group({
    Name: ["", Validators.required],
    Email: "",
    Phone: ["", Validators.required],
    UserId: ["", Validators.required],
    DateOfBirth: "",
    Blood_Type: "O+",
    Password: ["", Validators.required],
    Babies: this.formBuilder.array([this.createItem()]),
  });
  ngOnInit() {
    if (this.data && this.data.id) {
      this.userIdVal = this.data.id;
      this.secreteryService.getMotherById(this.userIdVal).subscribe((x) => {
        //this.form = this.formBuilder.group(x);
        const date = new Date(x.DateOfBirth).toISOString().substring(0, 10);
        const babiesGroups = [];
        x.Babies.forEach(baby => {
          const date2 = new Date(baby.DateTime_Of_Birth).toISOString().substring(0, 16);
          babiesGroups.push(this.formBuilder.group({
            Name: baby.Name,
            DateTime_Of_Birth: [date2, Validators.required],
            Gender: [baby.Gender, Validators.required],
            Blood_type: baby.Blood_type,
            Note: baby.Note,
            MotherId: baby.MotherId,
            Id: baby.Id,
            Birth_weight: [baby.Birth_weight, [Validators.required,Validators.max(9999),Validators.min(500) ]],
            BabyId: [baby.BabyId, [Validators.required, Validators.required,Validators.max(999999999),Validators.min(100000000) ]],
          }));
        });
     

        this.form = this.formBuilder.group({
          Id:x.Id,
          Name: [x.Name, Validators.required],
          Email:x.Email,
          Phone: [x.Phone, Validators.required],
          UserId: [x.UserId, [Validators.required, Validators.required,Validators.max(999999999),Validators.min(100000000) ]],
          DateOfBirth: date,
          Blood_Type: x.Blood_Type,
          Password: [x.Password, Validators.required],
          Babies: this.formBuilder.array(babiesGroups),
        }); 
      });
    }
  }
  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: "Order" });
    }
  }

  
  createItem(): any {
    return this.formBuilder.group({
      Name: "",
      DateTime_Of_Birth: ["", Validators.required],
      Gender: ["M", Validators.required],
      Blood_type: "O+",
      Note: "",
      Birth_weight: ["", [Validators.required,Validators.max(9999) ,Validators.min(500) ]],
      BabyId: ["", [Validators.required,Validators.max(999999999) ,Validators.min(100000000) ]],
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
  saveMother() {
    const mother = <Users>this.form.value;
    mother.Status = "Active";
    mother.IsMother = true;
    if (this.userIdVal !== 0) {
      this.secreteryService.updateMother(mother).subscribe((x) => {
        if (!x) {
          Swal.fire("Ooooops....", "משהו השתבש", "error").then(() => {});
        } else {
          Swal.fire("", "הנתונים נשמרו בהצלחה", "success").then(() => {
            this.close();
          });
        }
      });
    } else {
      mother.IsNurse = false;
      mother.IsSecretery = false;
      this.secreteryService.addMother(mother).subscribe((x) => {
        if (!x) {
          Swal.fire("Ooooops....", "משהו השתבש", "error").then(() => {});
        } else {
          Swal.fire("", "הנתונים נשמרו בהצלחה", "success").then(() => {
            this.route.navigateByUrl("/secretery");
          });
        }
      });
    }
  }
  
}
export class customValidationService {
  static checkLimit(min: number, max: number): ValidatorFn {
   return (c: AbstractControl): { [key: string]: boolean } | null => {
       if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
           return { 'range': true };
       }
       return null;
   };
 }
}
