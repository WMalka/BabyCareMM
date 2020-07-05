import { Baby } from 'src/app/models/baby.model';

export class Meal {
    public Id : number;
    public  BabyTz: string;
    public  MealTime: any; // need to change to date
    public  MealType:string;
    public  Baby :Baby
}