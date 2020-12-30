import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DiaperChange } from 'src/app/models/diaperChange.model';
import { NurseService } from 'src/app/services/nurse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diaper-change-modal',
  templateUrl: './diaper-change-modal.component.html',
  styleUrls: ['./diaper-change-modal.component.css']
})
export class DiaperChangeModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DiaperChangeModalComponent>,
    private nurseService: NurseService
  ) {}
  diaperChangeId =0;
  form = this.fb.group({
    DateTime:  this.fb.control(new Date().toISOString().substring(0, 16), [Validators.required]),
    Note: this.fb.control('', [Validators.required]),
    Id:this.fb.control(''),
    Baby_Id:this.fb.control(''),
  });
  babyId = '';
  diaperChange: DiaperChange;

  ngOnInit(): void {
    //cities
    if (this.data && this.data.id) {
      this.diaperChangeId = this.data.id;
      this.nurseService.GetDiaperChangeById(this.diaperChangeId).subscribe((x) => {
        this.form = this.fb.group(x);
      });
    }
    if (this.data && this.data.babyId) {
      this.babyId = this.data.babyId;
    
    }
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: 'Order' });
    }
  }
  saveDiaperChange() {
    const diaperChange = <DiaperChange>this.form.value;
    if(this.diaperChangeId === 0){
      diaperChange.Baby_Id = this.babyId;
      this.nurseService.AddDiaperChange(diaperChange).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success').then(()=>{
          this.close();
        });
      
      });
    }
   else{
    this.nurseService.UpdateDiaperChange(diaperChange).subscribe((x) => {
      Swal.fire("", "השמירה בוצעה בהצלחה", 'success').then(()=>{
        this.close();
      });
    
    });
   }
  }
}
