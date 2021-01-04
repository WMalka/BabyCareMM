import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TreatmentType } from 'src/app/models/treatmentType.model';
import { NurseService } from 'src/app/services/nurse.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-set-treatments-types-modal',
  templateUrl: './set-treatments-types-modal.component.html',
  styleUrls: ['./set-treatments-types-modal.component.css']
})
export class SetTreatmentsTypesModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SetTreatmentsTypesModalComponent>,
    private nurseService: NurseService
  ) {}
  treatmentTypeId =0;
  form = this.fb.group({
    Treatment: this.fb.control('', [Validators.required]),
    Id:this.fb.control(''),
  });
  id = '';
  treatmentType: TreatmentType;

  ngOnInit(): void {
    //cities
    if (this.data && this.data.id) {
      this.treatmentTypeId = this.data.id;
      this.nurseService.GetTreatmentTypeById(this.treatmentTypeId).subscribe((x) => {
        this.form = this.fb.group(x);
      });
    }
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: 'Order' });
    }
  }
  saveTreatmentType() {
    const treatmentType = <TreatmentType>this.form.value;
    if(this.treatmentTypeId === 0){
      this.nurseService.AddTreatmentType(treatmentType).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success').then(()=>{
          this.close();
        });
      
      });
    }
   else{
    this.nurseService.UpdateTreatmentType(treatmentType).subscribe((x) => {
      Swal.fire("", "השמירה בוצעה בהצלחה", 'success').then(()=>{
        this.close();
      });
    
    });
   }
  }
}
