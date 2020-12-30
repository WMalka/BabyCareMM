import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Treatments } from 'src/app/models/treatments.model';
import { NurseService } from 'src/app/services/nurse.service';
import Swal from 'sweetalert2';
import { TreatmentsModalComponent } from '../treatments-modal/treatments-modal.component';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {
  motherId: number;
  babyId:string;
  sourceTreatments: Treatments[] = [];
  treatments: Treatments[];
  dataSource: MatTableDataSource<Treatments>;
  constructor(
    private nurseService: NurseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
       public dialog: MatDialog
  ) {
  
    
  }
  filterName='';
  displayedColumns: string[] = [
    'DateTime',
    'Time',
    'TreatmentType',
    'Note',
    'actions',
    
  ];
  

  ngOnInit(): void {
    if (this.data && this.data.babyId) {
      this.babyId = this.data.babyId;
      this.getTreatments();
    }
    if(this.data && this.data.motherId)
    {  this.motherId = this.data.motherId;
      this.displayedColumns = [
        'DateTime',
        'Time',
        'TreatmentType',
        'Note',
      ];

    }
  }

  getTreatments(){
    this.nurseService.GetTreatmentsByBabyId(this.babyId).subscribe(x=>{
      this.treatments =x;
      this.sourceTreatments = Object.assign([], x);
      this.dataSource = new MatTableDataSource(this.treatments);
      // this.dataSource.filterPredicate = 
      // (data: Treatments, filter: string) => data.TreatmentsId.indexOf(filter) != -1;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  openModal(treatmentId?: number) {
    const dialogRef = this.dialog.open(TreatmentsModalComponent, {
      data: { id:treatmentId, babyId: this.babyId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getTreatments();
    });
  }


  deleteTreatment(treatmentId: number){
    Swal.fire({
      title: 'מחיקת טיפול',
      text: 'האם את בטוחה שאת רוצה למחוק את הטיפול מהמערכת?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא'
    }).then((result) => {
      if (result.value) {
      this.nurseService.DeleteTreatments(treatmentId).subscribe(x=>{
        if(x)
        {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success');
        this.getTreatments(
        );
        }
   
      });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      
      }
    })

  }
}