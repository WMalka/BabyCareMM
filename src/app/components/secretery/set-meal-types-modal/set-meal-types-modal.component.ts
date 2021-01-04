import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MealType } from 'src/app/models/mealType.model';
import { NurseService } from 'src/app/services/nurse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-meal-types-modal',
  templateUrl: './set-meal-types-modal.component.html',
  styleUrls: ['./set-meal-types-modal.component.css']
})
export class SetMealTypesModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SetMealTypesModalComponent>,
    private nurseService: NurseService
  ) {}
  mealTypeId =0;
  form = this.fb.group({
    Type: this.fb.control('', [Validators.required]),
    Id:this.fb.control(''),
  });
  id = '';
  mealType: MealType;

  ngOnInit(): void {
    //cities
    if (this.data && this.data.id) {
      this.mealTypeId = this.data.id;
      this.nurseService.GetMealTypeById(this.mealTypeId).subscribe((x) => {
        this.form = this.fb.group(x);
      });
    }
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: 'Order' });
    }
  }
  saveMealType() {
    const mealType = <MealType>this.form.value;
    if(this.mealTypeId === 0){
      this.nurseService.AddMealType(mealType).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success').then(()=>{
          this.close();
        });
      
      });
    }
   else{
    this.nurseService.UpdateMealType(mealType).subscribe((x) => {
      Swal.fire("", "השמירה בוצעה בהצלחה", 'success').then(()=>{
        this.close();
      });
    
    });
   }
  }
}
