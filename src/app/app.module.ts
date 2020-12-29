import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './../app/components/login/login.component'
import { MothersComponent} from './../app/components/mothers/mothers.component'
import { SecreteryComponent} from './../app/components/secretery/secretery.component'
import { SecreteryComponentNewMother} from './../app/components/secretery/registrationMother/secretery.component.new.mother'
import { SecreteryComponentNewNurse} from './../app/components/secretery/registrationNurse/secretery.component.new.nurse'
import { HomeComponent} from './../app/components/home/home.component'
import { MealsService } from './services/meals.service';
import { UsersService } from './services/users.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { BabiesComponent } from './../app/components/babies/babies.component';
import { NurseComponent } from './components/nurse/nurse.component';
import { NgbdModalBasic } from './components/modalBasic/modal-basic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';


import {MatTableDataSource, MatTableModule, MatMenuModule, MatTabsModule, MatFormFieldModule, MatButtonModule, MatRippleModule, MatIconModule, MatRadioButton, MatRadioModule, MatProgressSpinnerModule, MAT_DIALOG_DATA, MatDialogRef, MAT_DATE_LOCALE ,   MatDialogModule, MatInputModule, MatTooltipModule, MatAutocompleteModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginNurseComponent } from './components/login-nurse/login-nurse.component';
import { LoginSecreteryComponent } from './components/login-secretery/login-secretery.component';
import { RemoveMotherComponent } from './components/secretery/remove-mother/remove-mother.component';
import { RemoveNurseComponent } from './components/secretery/remove-nurse/remove-nurse.component';
import { AuthGuardSecretery } from './services/auth-guard-secretery.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardNurse } from './services/auth-guard-nurse.service';
import { SpinnerOverlayComponent } from './components/general/spinner-overlay/spinner-overlay.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { RemoveMotherModalComponent } from './components/secretery/remove-mother-modal/remove-mother-modal.component';
import { MealsComponent } from './components/baby/meals/meals.component';
import { BathComponent } from './components/baby/bath/bath.component';
import { TreatmentsComponent } from './components/baby/treatments/treatments.component';
import { DiaperChangeComponent } from './components/baby/diaper-change/diaper-change.component';
import { DiaperChangeModalComponent } from './components/baby/diaper-change-modal/diaper-change-modal.component';
import { TreatmentsModalComponent } from './components/baby/treatments-modal/treatments-modal.component';
import { BathModalComponent } from './components/baby/bath-modal/bath-modal.component';
import { MealsModalComponent } from './components/baby/meals-modal/meals-modal.component';

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
    NgbdModalBasic,
    HeaderComponent,
    LoginNurseComponent,
    LoginSecreteryComponent,
    RemoveMotherComponent,
    RemoveNurseComponent,
    SpinnerOverlayComponent,
    RemoveMotherModalComponent,
    MealsComponent,
    BathComponent,
    TreatmentsComponent,
    DiaperChangeComponent,
    DiaperChangeModalComponent,
    TreatmentsModalComponent,
    BathModalComponent,
    MealsModalComponent
    
  ],
 exports: [
  MatTabsModule,
  MatFormFieldModule ,
  MatMenuModule,
  MatButtonModule,
  MatFormFieldModule,
  MatMenuModule,
  MatRippleModule,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule ,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatRippleModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatAutocompleteModule

  ],
  // entryComponents:[
  //   NgbdModalBasic
  // ],
  providers: [
    UsersService,
   MealsService,
   AuthGuardSecretery,
   AuthGuard,
   AuthGuardNurse,
   { provide: MAT_DIALOG_DATA, useValue: {} },
   { provide: MatDialogRef, useValue: {} },
   {  provide: MAT_DATE_LOCALE, useValue: 'he-IL'},
   {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true,
  

  },
],
  bootstrap: [AppComponent]//NgbdModalConfig
})
export class AppModule{ 

}
// export class NgbdModalConfigModule {}

