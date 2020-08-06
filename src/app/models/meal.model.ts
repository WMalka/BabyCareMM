import { MealType } from "./mealType.model";

export class Meals{
    public DateTime: Date;
    public Meals_Type_Id: number;
    public Id: number; 
    public Note: string;
    public Baby_Id: string;

    public MealsType:MealType;
}
