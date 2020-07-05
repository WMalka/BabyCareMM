import { Meal } from 'src/app/models/meal.model';
import { NumberFormatStyle } from '@angular/common/src/i18n/locale_data_api';
import { Mother } from 'src/app/models/mother.model';

export class Baby {
   public  Tz:string;
    public  BirthWeight:number;
    public  CurrentWeight:number;
    public TimeLapseMeals:number;
    public  MealType:string;
    public  MotherTz:string;
    public  Mother: Mother;
    public Meals : Meal[]; 
    //bloodType:string;
}