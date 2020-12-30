import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Baths } from 'src/app/models/baths.model';
import { NurseService } from 'src/app/services/nurse.service';
import Swal from 'sweetalert2';
import { BathModalComponent } from '../bath-modal/bath-modal.component';

@Component({
  selector: 'app-bath',
  templateUrl: './bath.component.html',
  styleUrls: ['./bath.component.css']
})
export class BathComponent implements OnInit {
  motherId: number;
  babyId:string;
  sourceBaths: Baths[] = [];
  baths: Baths[];
  dataSource: MatTableDataSource<Baths>;
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
      this.getBaths();
    }
    if(this.data && this.data.motherId)
    {  this.motherId = this.data.motherId;
      this.displayedColumns = [
        'DateTime',
        'Time',
        'Note',
      ];

    }
  }

  getBaths(){
    this.nurseService.GetBathByBabyId(this.babyId).subscribe(x=>{
      this.baths =x;
      this.sourceBaths = Object.assign([], x);
      this.dataSource = new MatTableDataSource(this.baths);
      // this.dataSource.filterPredicate = 
      // (data: Baths, filter: string) => data.BathsId.indexOf(filter) != -1;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  openModal(bathId?: number) {
    const dialogRef = this.dialog.open(BathModalComponent, {
      data: { id:bathId, babyId: this.babyId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getBaths();
    });
  }


  deleteBath(bathId: number){
    Swal.fire({
      title: 'מחיקת רחצה',
      text: 'האם את בטוחה שאת רוצה למחוק את הרחצה מהמערכת?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא'
    }).then((result) => {
      if (result.value) {
      this.nurseService.DeleteBath(bathId).subscribe(x=>{
        if(x)
        {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success');
        this.getBaths(
        );
        }
   
      });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      
      }
    })

  }
}