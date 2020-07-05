import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './../app/components/login/login.component'
import { MothersComponent} from './../app/components/mothers/mothers.component'
//import { BabiesComponentMeal } from './../app/components/babies/babies.component.meal/babies.component.meal';
import { SecreteryComponent} from './../app/components/secretery/secretery.component'
//import { NgbdModalConfig} from './../app/components/secretery/secretery.component'
import { SecreteryComponentNewMother} from './../app/components/secretery/registrationMother/secretery.component.new.mother'
import { SecreteryComponentNewNurse} from './../app/components/secretery/registrationNurse/secretery.component.new.nurse'
import { HomeComponent} from './../app/components/home/home.component'
import { MealsService } from './services/meals.service';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http'; 
import { BabiesComponent } from './../app/components/babies/babies.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NurseComponent } from './components/nurse/nurse.component';
import { NgbdModalBasic } from './components/modalBasic/modal-basic';



@NgModule({
  declarations: [
    AppComponent,
    MothersComponent,
    LoginComponent,
    HomeComponent,
    BabiesComponent,
    SecreteryComponent,
    SecreteryComponentNewMother,
    SecreteryComponentNewNurse,
    NurseComponent,
    NgbdModalBasic
   // NgbdModalConfig,
   // BabiesComponentMeal,
    
  ],
 // exports: [
 // NgbdModalConfig,
  //],
  imports: [
    HttpClientModule,
    //HttpModule,
    BrowserModule,
    AppRoutingModule,
    //NgbModule,

  ],
  // entryComponents:[
  //   NgbdModalBasic
  // ],
  providers: [
    UsersService,
   MealsService
],
  bootstrap: [AppComponent]//NgbdModalConfig
})
export class AppModule{ 

}
// export class NgbdModalConfigModule {}

