import { Component, Inject, OnInit } from "@angular/core";
import { Users } from "src/app/models/user.model";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SecreteryService } from "src/app/services/secretery.service";
import { SelectionModel } from "@angular/cdk/collections";
import Swal from "sweetalert2";
import { SecreteryComponentNewNurse } from "../registrationNurse/secretery.component.new.nurse";

@Component({
  selector: 'app-remove-nurse',
  templateUrl: './remove-nurse.component.html',
  styleUrls: ['./remove-nurse.component.css']
})
export class RemoveNurseComponent  implements OnInit {
 
  sourceNurses: Users[] = [];
  nurses: Users[];
  dataSource: MatTableDataSource<Users>;
  constructor(
    private secreteryService: SecreteryService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
  
    
  }
  filterName='';

  displayedColumns: string[] = [
    'Name',
    'Email',
    'Phone',
    'UserId',
    'DateOfBirth',
    'actions',
  ];
  
  compareObjects(o1: any, o2: any): boolean {
    return o1 === o2;
  }
  ngOnInit(): void {
  this.getNurses();
  }

  getNurses(){
    this.secreteryService.GetAllNurses().subscribe(x=>{
      this.nurses =x;
      this.sourceNurses = Object.assign([], x);
      this.dataSource = new MatTableDataSource(this.nurses);
      this.dataSource.filterPredicate = 
      (data: Users, filter: string) => data.UserId.indexOf(filter) != -1;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  openModal(id?: number) {
    const dialogRef = this.dialog.open(SecreteryComponentNewNurse, {
      data: { id:id},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getNurses();
    });
  }


  deleteUser(userId: number){
    Swal.fire({
      title: 'מחיקת אחות',
      text: 'האם את בטוחה שאת רוצה למחוק את האחות מהמערכת?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'כן',
      cancelButtonText: 'לא'
    }).then((result) => {
      if (result.value) {
      this.secreteryService.deleteNurse(userId).subscribe(x=>{
        if(x)
        {
        Swal.fire("", "השמירה בוצעה בהצלחה", 'success');
        this.getNurses(
        );
        }
   
      });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      
      }
    })

  }
}