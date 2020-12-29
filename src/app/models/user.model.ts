
import { Baby } from "./baby.model";


export class Users{
    public Id: number;
    public Name: string;
    public Email: string;
    public Phone: string;
    public UserId: string;
    public DateOfBirth: Date;
    public Blood_Type: string;
    public IsMother: boolean;
    public IsNurse: boolean;
    public IsSecretery: boolean;
    public Password: string;
    public Status: string;


    public Babies: Baby;

}
    
    