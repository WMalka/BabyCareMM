import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {  MothersComponent } from './components/mothers/mothers.component';
import { BabiesComponent } from './components/babies/babies.component';
import { SecreteryComponent } from './components/secretery/secretery.component';
import { SecreteryComponentNewMother} from './components/secretery/registrationMother/secretery.component.new.mother'
import { NurseComponent } from './components/nurse/nurse.component';
import { SecreteryComponentNewNurse} from './../app/components/secretery/registrationNurse/secretery.component.new.nurse'//problem
//import { BabiesComponentMeal } from './../app/components/babies/babies.component.meal/babies.component.meal';

// import {BabiesComponentMeal} from'./components/babies/babies.component.meal';//malkala

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'mother', component: MothersComponent },
  { path: 'nurse', component: NurseComponent },
  { path: 'home', component: HomeComponent },
  {path:"babies", component: BabiesComponent},
  {path:"secretery", component: SecreteryComponent},
  {path:"secreterynewmother", component: SecreteryComponentNewMother},
  {path:"secreterynewnurse", component: SecreteryComponentNewNurse},

  //{ path: 'meals', component: BabiesComponentMeal },//malkala
  { path: '**', component: LoginComponent },
  


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
