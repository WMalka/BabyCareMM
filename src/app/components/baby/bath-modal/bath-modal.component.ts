import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Baths } from 'src/app/models/baths.model';
import { NurseService } from 'src/app/services/nurse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bath-modal',
  templateUrl: './bath-modal.component.html',
  styleUrls: ['./bath-modal.component.css']
})
export class BathModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BathModalComponent>,
    private nurseService: NurseService
  ) {}
  bathId =0;
  form = this.fb.group({
    DateTime: this.fb.control(new Date(), [Validators.required]),
    Note: this.fb.control('', [Validators.required]),
    Id:this.fb.control(''),
    Baby_Id:this.fb.control(''),
  });
  babyId = '';
  bath: Baths;

  ngOnInit(): void {
    //cities
    if (this.data && this.data.id) {
      this.bathId = this.data.id;
      this.nurseService.GetBathById(this.bathId).subscribe((x) => {
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
  saveBath() {
    const bath = <Baths>this.form.value;
    if(this.bathId === 0){
      bath.Baby_Id = this.babyId;
      this.nurseService.AddBath(bath).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success').then(()=>{
          this.close();
        });
      
      });
    }
   else{
    this.nurseService.UpdateBath(bath).subscribe((x) => {
      Swal.fire("", "השמירה בוצעה בהצלחה", 'success').then(()=>{
        this.close();
      });
    
    });
   }
  }
}
