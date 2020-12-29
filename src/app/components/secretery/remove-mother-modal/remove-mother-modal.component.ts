import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Users } from 'src/app/models/user.model';
import { SecreteryService } from 'src/app/services/secretery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remove-mother-modal',
  templateUrl: './remove-mother-modal.component.html',
  styleUrls: ['./remove-mother-modal.component.css']
})
export class RemoveMotherModalComponent implements OnInit {
  motherId: number;
  mother: Users;
  form = this.fb.group({
    note: this.fb.control("", Validators.required),
  });
  constructor(private dialogRef: MatDialogRef<RemoveMotherModalComponent>,
    private secService: SecreteryService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  
  }
  ngOnInit(): void {
  
    if (this.data && this.data.id) {
      this.motherId = this.data.id;
      this.secService.getMotherById(this.motherId).subscribe((x) => {
        this.mother = x;
      //  this.form = this.fb.group(x);
      });
    }
  }
  sendMother() {
    const note = this.form.value.note;
 
   this.secService.deleteMother(this.motherId,note).subscribe(x => { 

      Swal.fire("", "השחרור בוצע בהצלחה", 'success').then(()=>{
        this.close();
      })

    })
 
  }


  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: 'Order' });
    }
  }
}
