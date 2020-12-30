
import { Users } from "./user.model";
import { Meals } from "./meal.model";
import { Treatments } from "./treatments.model";
import { DiaperChange } from "./diaperChange.model";
import { Baths } from "./baths.model";


export class Baby {
  public Id: number;
  //public MotherId:
  public BabyId: string;
  public Name: string;
  public DateTime_Of_Birth: Date;
  public Birth_weight: number;
  public Gender: string;
  public Blood_type: string;
  public Note: string;
  public MotherId: number;
  public Status: string;

  public Baths: Baths[];
  public DiaperChanges: DiaperChange[];
  public Meals: Meals[];
  public Treatments: Treatments[];
  public Users: Users;
}
