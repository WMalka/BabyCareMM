import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SecreteryService } from "src/app/services/secretery.service";
import { NurseService } from "src/app/services/nurse.service";
import { MealType } from "src/app/models/mealType.model";
import { SetMealTypesModalComponent } from "../set-meal-types-modal/set-meal-types-modal.component";

@Component({
  selector: 'app-set-meal-types',
  templateUrl: './set-meal-types.component.html',
  styleUrls: ['./set-meal-types.component.css']
})
export class SetMealTypesComponent  implements OnInit {
 
  sourceMealsType: MealType[] = [];
  mealsType: MealType[];
  dataSource: MatTableDataSource<MealType>;
  constructor(
    private secreteryService: SecreteryService,private nurseService: NurseService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
  
    
  }
  filterName='';

  displayedColumns: string[] = [
    'Type',
    'actions',
  ];
  
  compareObjects(o1: any, o2: any): boolean {
    return o1 === o2;
  }
  ngOnInit(): void {
  this.getMealsType();
  }

  getMealsType(){
    this.nurseService.GetMealsType().subscribe(x=>{
      this.mealsType =x;
      this.sourceMealsType = Object.assign([], x);
      this.dataSource = new MatTableDataSource(this.mealsType);
      this.dataSource.filterPredicate = 
      (data: MealType, filter: string) => data.Type.indexOf(filter) != -1;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  openModal(id?: number) {
    const dialogRef = this.dialog.open(SetMealTypesModalComponent, {
      data: { id:id},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getMealsType();
    });
  }


 
}