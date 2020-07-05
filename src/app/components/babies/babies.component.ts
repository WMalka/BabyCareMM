import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal.model';

@Component({
  selector: 'app-babies',
  templateUrl: './babies.component.html',
  styleUrls: ['./babies.component.css']
})

export class BabiesComponent implements OnInit {

  mealsBaby:Meal[]
  
  constructor() { }

  ngOnInit() {
  }

}
