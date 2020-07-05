import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  constructor() { }
  name="nkfv"
  m_meal="05"
  h_meal="12"
  note="שם התינוק המטופל: בן בתיה"





  


  
  ngOnInit() {
    
    // angular.module('dialogDemo2', ['ngMaterial'])

    // .controller('AppCtrl', function($scope, $mdDialog) {
    //   $scope.openFromLeft = function() {
    //     $mdDialog.show(
    //       $mdDialog.alert()
    //         .clickOutsideToClose(true)
    //         .title('Opening from the left')
    //         .textContent('Closing to the right!')
    //         .ariaLabel('Left to right demo')
    //         .ok('Nice!')
    //         // You can specify either sting with query selector
    //         .openFrom('#left')
    //         // or an element
    //         .closeTo(angular.element(document.querySelector('#right')))
    //     );
    //   };
    
    //   $scope.openOffscreen = function() {
    //     $mdDialog.show(
    //       $mdDialog.alert()
    //         .clickOutsideToClose(true)
    //         .title('Opening from offscreen')
    //         .textContent('Closing to offscreen')
    //         .ariaLabel('Offscreen Demo')
    //         .ok('Amazing!')
    //         // Or you can specify the rect to do the transition from
    //         .openFrom({
    //           top: -50,
    //           width: 30,
    //           height: 80
    //         })
    //         .closeTo({
    //           left: 1500
    //         })
    //     );
    //   };
    // });
  }

}
