import { Meal } from 'src/app/models/meal.model';
import { NumberFormatStyle } from '@angular/common/src/i18n/locale_data_api';
import { Mother } from 'src/app/models/mother.model';

// export class Baby {
//    public  Tz:string;
//     public  BirthWeight:number;
//     public  CurrentWeight:number;
//     public TimeLapseMeals:number;
//     public  MealType:string;
//     public  MotherTz:string;
//     public  Mother: Mother;
//     public Meals : Meal[]; 
//     //bloodType:string;
// }
export class Babies{
    public Id: number;
    //public MotherId:
    public BabyId: string;
    public Name: string;
    public DateTime_Of_Birth: Date;
    public Birth_weight: number;
    public Gender: string;
    public Blood_type: string;
    public Note: string; 
}