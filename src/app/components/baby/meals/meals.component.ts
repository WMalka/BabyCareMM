import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Meals } from 'src/app/models/meal.model';
import { NurseService } from 'src/app/services/nurse.service';
import Swal from 'sweetalert2';
import { MealsModalComponent } from '../meals-modal/meals-modal.component';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  babyId:string;
  sourceMeals: Meals[] = [];
  meals: Meals[];
  dataSource: MatTableDataSource<Meals>;
  constructor(
    private nurseService: NurseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
       public dialog: MatDialog
  ) {
  
    
  }
  motherId:number;
  filterName='';
  displayedColumns: string[] = [
    'DateTime',
    'Time',
    'MealType',
    'Note',
    'actions',
    
  ];
  

  ngOnInit(): void {
    if (this.data && this.data.babyId) {
      this.babyId = this.data.babyId;
      this.getMeals();
    }
    if(this.data && this.data.motherId)
    {
      this.motherId = this.data.motherId;
   

    }
  }

  getMeals(){
    this.nurseService.GetMealsByBabyId(this.babyId).subscribe(x=>{
      this.meals =x;
      this.sourceMeals = Object.assign([], x);
      this.dataSource = new MatTableDataSource(this.meals);
      // this.dataSource.filterPredicate = 
      // (data: Meals, filter: string) => data.MealsId.indexOf(filter) != -1;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  openModal(mealId?: number) {
    const dialogRef = this.dialog.open(MealsModalComponent, {
      data: { id:mealId, babyId: this.babyId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getMeals();
    });
  }


  deleteMeal(mealId: number){
    Swal.fire({
      title: 'מחיקת ארוחה',
      text: 'האם את בטוחה שאת רוצה למחוק את הארוחה מהמערכת?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא'
    }).then((result) => {
      if (result.value) {
      this.nurseService.DeleteMeals(mealId).subscribe(x=>{
        if(x)
        {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success');
        this.getMeals(
        );
        }
   
      });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      
      }
    })

  }
}