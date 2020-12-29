import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Users } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  user: Users;
  constructor(private userService: UsersService,private route: Router) {
    this.userService.userChanged.subscribe((x) => {
      if (x) {
        this.user = <Users>JSON.parse(localStorage.getItem("user"));
      } else {
        this.user = null;
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem("user")) {
      this.user = <Users>JSON.parse(localStorage.getItem("user"));
    }
  }
  logout() {
    localStorage.clear();
    this.user = null;
    this.route.navigateByUrl("/login");
    this.userService.userChanged.next();
  }
}
