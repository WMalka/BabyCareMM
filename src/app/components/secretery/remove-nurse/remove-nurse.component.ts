import { Component, OnInit } from "@angular/core";
import { Users } from "src/app/models/user.model";
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SecreteryService } from "src/app/services/secretery.service";
import { SelectionModel } from "@angular/cdk/collections";
import Swal from "sweetalert2";

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
    private secreteryService: SecreteryService
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
 
  openModal(buildId: number,userId?: number) {
    // const dialogRef = this.dialog.open(AdminUsersModalComponent, {
    //   data: { userId:userId,buildId:buildId },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    //   this.getNursesByBuild(
    //     this.buildSelectedId,
    //   );
    // });
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