import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',]
})
export class HomeComponent implements OnInit {
u:string
p:string
  constructor() {
    
  }
   

  ngOnInit() {
  }
  
}







// export class AppComponent {
//   model: any = {};

//   onSubmit() {
//     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
//   }
// }