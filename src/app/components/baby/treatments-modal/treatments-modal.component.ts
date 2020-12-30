import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Treatments } from "src/app/models/treatments.model";
import { TreatmentType } from 'src/app/models/treatmentType.model';
import { NurseService } from "src/app/services/nurse.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-treatments-modal',
  templateUrl: './treatments-modal.component.html',
  styleUrls: ['./treatments-modal.component.css']
})
export class TreatmentsModalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TreatmentsModalComponent>,
    private nurseService: NurseService
  ) {}
  treatmentsTypes: TreatmentType[] = [];
  treatmentId = 0;
  form = this.fb.group({
    Date_Time:  this.fb.control(new Date().toISOString().substring(0, 16), [Validators.required]),
    Note: this.fb.control("", [Validators.required]),
    Id: this.fb.control(""),
    Baby_Id: this.fb.control(""),
    Treatment_Type_Id: this.fb.control(""),
  });
  babyId = "";
  treatment: Treatments;

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.treatmentId = this.data.id;
      this.nurseService.GetTreatmentsById(this.treatmentId).subscribe((x) => {
        this.form = this.fb.group(x);
      });
    }
    if (this.data && this.data.babyId) {
      this.babyId = this.data.babyId;
    }
    this.nurseService.GetTreatmentType().subscribe((treatmentsT) => {
      this.treatmentsTypes = treatmentsT;
    });
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: "Order" });
    }
  }
  saveTreatment() {
    const treatment = <Treatments>this.form.value;
    if (this.treatmentId === 0) {
      treatment.Baby_Id = this.babyId;
      this.nurseService.AddTreatments(treatment).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה", "success").then(() => {
          this.close();
        });
      });
    } else {
      this.nurseService.UpdateTreatments(treatment).subscribe((x) => {
        Swal.fire("", "השמירה בוצעה בהצלחה", "success").then(() => {
          this.close();
        });
      });
    }
  }
}
