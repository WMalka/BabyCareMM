import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/user.model';
import { SecreteryService } from 'src/app/services/secretery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-secretery',
  templateUrl:'./secretery.component.new.nurse.html',
  //styleUrls: ['./secretery.component.css']
})



export class SecreteryComponentNewNurse implements OnInit {
  form: FormGroup;
  Babies: FormArray;
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
      Blood_Type: "",
      Password: ["", Validators.required],
    });
  }
  addNurse(){
    const nurse = <Users>this.form.value;
    nurse.IsMother = false;
    nurse.IsNurse = true;
    nurse.Status = "Active";
    nurse.IsSecretery = false;
    nurse.Babies = null;
    this.secreteryService.addNurse(nurse).subscribe((x) => {
      if (!x) {
        Swal.fire("Ooooops....", "משהו השתבש", "error").then(() => {});
      } else {
        Swal.fire("", "הנתונים נשמרו בהצלחה", "success").then(() => {this.route.navigateByUrl('/secretery');});
      }
    });
  }
}



