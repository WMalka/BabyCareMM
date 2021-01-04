import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SecreteryService } from "src/app/services/secretery.service";
import { NurseService } from "src/app/services/nurse.service";
import { TreatmentType } from "src/app/models/treatmentType.model";
import { SetTreatmentsTypesModalComponent } from "../set-treatments-types-modal/set-treatments-types-modal.component";

@Component({
  selector: 'app-set-treatments-types',
  templateUrl: './set-treatments-types.component.html',
  styleUrls: ['./set-treatments-types.component.css']
})
export class SetTreatmentsTypesComponent   implements OnInit {
 
  sourcetreatmentsType: TreatmentType[] = [];
  treatmentsType: TreatmentType[];
  dataSource: MatTableDataSource<TreatmentType>;
  constructor(
    private secreteryService: SecreteryService,private nurseService: NurseService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
  
    
  }
  filterName='';

  displayedColumns: string[] = [
    'Treatment',
    'actions',
  ];
  
  compareObjects(o1: any, o2: any): boolean {
    return o1 === o2;
  }
  ngOnInit(): void {
  this.gettreatmentsType();
  }

  gettreatmentsType(){
    this.nurseService.GetTreatmentType().subscribe(x=>{
      this.treatmentsType =x;
      this.sourcetreatmentsType = Object.assign([], x);
      this.dataSource = new MatTableDataSource(this.treatmentsType);
      this.dataSource.filterPredicate = 
      (data: TreatmentType, filter: string) => data.Treatment.indexOf(filter) != -1;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  openModal(id?: number) {
    const dialogRef = this.dialog.open(SetTreatmentsTypesModalComponent, {
      data: { id:id},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.gettreatmentsType();
    });
  }


 
}