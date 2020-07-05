import { Component, OnInit } from '@angular/core';
//import {  NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';//111
import { NgbdModalBasic } from '../modalBasic/modal-basic';

@Component({
  selector: 'app-secretery',
  templateUrl: './secretery.component.html',
  styleUrls: ['./secretery.component.css'],
  entryComponents:[
    NgbdModalBasic
  ],
})



 export class SecreteryComponent  {
  closeResult: string;
 // modalOptions:NgbModalOptions;

  constructor(
    //private modalService: NgbModal
  ){
    // this.modalOptions = {
    //   backdrop:'static',
    //   backdropClass:'customBackdrop'
    // }
  }
  
  // open(content) {
  //   this.modalService.open(content, this.modalOptions).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
 
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }
}