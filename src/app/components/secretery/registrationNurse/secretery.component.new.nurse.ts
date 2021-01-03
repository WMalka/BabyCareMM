import { Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { Users } from "src/app/models/user.model";
import { SecreteryService } from "src/app/services/secretery.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-secretery",
  templateUrl: "./secretery.component.new.nurse.html",
  //styleUrls: ['./secretery.component.css']
})
export class SecreteryComponentNewNurse implements OnInit {
  Babies: FormArray;
  userIdVal = 0;
  form = this.formBuilder.group({
    Name: ["", Validators.required],
    Email: "",
    Phone: ["", Validators.required],
    UserId: ["", [Validators.required, Validators.required,Validators.max(999999999),Validators.min(100000000) ]],
    DateOfBirth: "",
    Blood_Type: "",
    Password: ["", Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private secreteryService: SecreteryService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SecreteryComponentNewNurse>
  ) {}

  ngOnInit() {
    if (this.data && this.data.id) {
      this.userIdVal = this.data.id;
      this.secreteryService.getNurseById(this.userIdVal).subscribe((x) => {
        this.form = this.formBuilder.group(x);

      const date = (new Date(x.DateOfBirth).toISOString().substring(0, 10));
        this.form.patchValue({
          DateOfBirth: date,
        });

      });
    } 
  }
  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: "Order" });
    }
  }
  saveNurse() {
    const nurse = <Users>this.form.value;
    nurse.IsNurse = true;
    nurse.Status = "Active";

    if (this.userIdVal !== 0) {
      this.secreteryService.updateNurse(nurse).subscribe((x) => {
        if (!x) {
          Swal.fire("Ooooops....", "משהו השתבש", "error").then(() => {});
        } else {
          Swal.fire("", "הנתונים נשמרו בהצלחה", "success").then(() => {
            this.close();
          });
        }
      });
    } else {
      nurse.IsMother = false;
      nurse.IsSecretery = false;
      nurse.Babies = null;
      this.secreteryService.addNurse(nurse).subscribe((x) => {
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
