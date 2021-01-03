import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { DiaperChange } from 'src/app/models/diaperChange.model';
import { NurseService } from 'src/app/services/nurse.service';
import Swal from 'sweetalert2';
import { DiaperChangeModalComponent } from '../diaper-change-modal/diaper-change-modal.component';

@Component({
  selector: 'app-diaper-change',
  templateUrl: './diaper-change.component.html',
  styleUrls: ['./diaper-change.component.css']
})
export class DiaperChangeComponent implements OnInit {

  babyId:string;
  sourceDiaperChanges: DiaperChange[] = [];
  diaperChanges: DiaperChange[];
  dataSource: MatTableDataSource<DiaperChange>;
  motherId: number;
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
    'Note',
    'actions',
  ];
  

  ngOnInit(): void {
    if (this.data && this.data.babyId) {
      this.babyId = this.data.babyId;
      this.getDiaperChanges();
    }
    if(this.data && this.data.motherId)
    {
      this.motherId = this.data.motherId;
   

    }
  }

  getDiaperChanges(){
    this.nurseService.GetDiaperChangeByBabyId(this.babyId).subscribe(x=>{
      this.diaperChanges =x;
      this.sourceDiaperChanges = Object.assign([], x);
      this.dataSource = new MatTableDataSource(this.diaperChanges);
      // this.dataSource.filterPredicate = 
      // (data: DiaperChanges, filter: string) => data.DiaperChangesId.indexOf(filter) != -1;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  openModal(diaperChangeId?: number) {
    const dialogRef = this.dialog.open(DiaperChangeModalComponent, {
      data: { id:diaperChangeId, babyId: this.babyId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getDiaperChanges();
    });
  }


  deleteDiaperChange(diaperChangeId: number){
    Swal.fire({
      title: 'מחיקת החתלה',
      text: 'האם את בטוחה שאת רוצה למחוק את ההחתלה מהמערכת?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא'
    }).then((result) => {
      if (result.value) {
      this.nurseService.DeleteDiaperChange(diaperChangeId).subscribe(x=>{
        if(x)
        {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success');
        this.getDiaperChanges(
        );
        }
   
      });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      
      }
    })

  }
}