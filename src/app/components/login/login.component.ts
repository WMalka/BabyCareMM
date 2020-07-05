import { Component, OnInit } from '@angular/core';
import { User } from '../../../app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';//dialod





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  model: any = {};//111

  users: User[];
  title: string;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((res: User[]) => {
      this.users = res;
      console.log(res);
    }, err => {
      console.log(err)
    });
  }

  onSubmit() {//111
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));//111
  }//111

}


//dialog


export class NgbdModalBasic {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

