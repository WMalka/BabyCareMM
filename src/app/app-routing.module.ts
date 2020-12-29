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
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardNurse } from './services/auth-guard-nurse.service';
import { AuthGuardSecretery } from './services/auth-guard-secretery.service';
import { LoginNurseComponent } from './components/login-nurse/login-nurse.component';
import { LoginSecreteryComponent } from './components/login-secretery/login-secretery.component';
import { RemoveNurseComponent } from './components/secretery/remove-nurse/remove-nurse.component';
import { RemoveMotherComponent } from './components/secretery/remove-mother/remove-mother.component';
//import { BabiesComponentMeal } from './../app/components/babies/babies.component.meal/babies.component.meal';

// import {BabiesComponentMeal} from'./components/babies/babies.component.meal';//malkala

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'login-nurse', component: LoginNurseComponent },
  { path: 'login-secretery', component: LoginSecreteryComponent },
  { path: 'mother',canActivate:[AuthGuard], component: MothersComponent },
  { path: 'nurse',canActivate:[AuthGuardNurse] ,component: NurseComponent },
  { path: 'home', component: HomeComponent },
  {path:"babies", component: BabiesComponent},
  {path:"secretery",canActivate:[AuthGuardSecretery], component: SecreteryComponent},
  {path:"secreterynewmother",canActivate:[AuthGuardSecretery], component: SecreteryComponentNewMother},
  {path:"secreterynewnurse",canActivate:[AuthGuardSecretery], component: SecreteryComponentNewNurse},
  {path:"secreteryremovenurse",canActivate:[AuthGuardSecretery], component: RemoveNurseComponent},
  {path:"secreteryremovemother",canActivate:[AuthGuardSecretery], component: RemoveMotherComponent},
  { path: '**', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
 


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
