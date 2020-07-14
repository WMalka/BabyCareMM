import { Babies } from 'src/app/models/baby.model';

// export class Meal {
//     public Id : number;
//     public  BabyTz: string;
//     public  MealTime: any; // need to change to date
//     public  MealType:string;
//     public  Baby :Baby
// }

export class Meals{
    public DateTime: Date;
    public type: number;
    public Id: number; 
    public Note: string;
    public BabyId: string;
}