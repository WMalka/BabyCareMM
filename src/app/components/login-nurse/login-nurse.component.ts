import { Component, OnInit } from "@angular/core";
import { Users } from "../../../app/models/user.model";
import { UsersService } from "src/app/services/users.service";
import { FormBuilder, MinLengthValidator, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-nurse',
  templateUrl: './login-nurse.component.html',
  styleUrls: ['./login-nurse.component.css']
})
export class LoginNurseComponent implements  OnInit {
  user: Users;
  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  f = this.fb.group({
    tz: this.fb.control("",  [Validators.required, Validators.required,Validators.max(999999999),Validators.min(100000000) ]),
    password: this.fb.control("", [Validators.required]),
  });
  ngOnInit() {}

  login() {
    this.usersService.login(this.f.value.tz, this.f.value.password).subscribe(
      (user) => {
        if (!user) {
          Swal.fire(
            "Ooooops....",
            "ת.ז או סיסמא לא תקינים",
            "error"
          ).then(() => {});
        } else {
          Swal.fire("", "הכניסה בוצעה בהצלחה", "success").then(() => {
            localStorage.setItem("user", JSON.stringify(user));
            this.user = user;
            this.usersService.userChanged.next("user");
         if (this.user.IsNurse) {
              this.router.navigateByUrl("/nurse");
            } else    if (this.user.IsMother) {
              this.router.navigateByUrl("/mother");
            } else {
              this.router.navigateByUrl("/secretery");
            }
          });
        }
      },
      (err) => {}
    );
  }
}
