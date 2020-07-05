import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './mothers.component.html',
  styleUrls: ['./mothers.component.css']
})
export class MothersComponent implements OnInit {

  constructor() { 
    h_meal:Number
    m_meal:Number
    note:String
    
  }

  h_meal=5
  m_meal=9
name="מלכי";
note='הערה למקרה חירום'

  ngOnInit() {
    
  }

}
