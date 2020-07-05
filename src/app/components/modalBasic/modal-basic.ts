import {Component, Input} from '@angular/core';

//import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-basic.html'
})
export class NgbdModalBasic {

  @Input() my_modal_title;
  @Input() my_modal_content;
 
  constructor() {}//public activeModal: NgbActiveModal
 
  ngOnInit() {
  }
}