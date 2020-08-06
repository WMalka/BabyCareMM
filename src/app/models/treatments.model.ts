import { TreatmentType } from "./treatmentType.model";

export class Treatments{
    public Id: number;
    public Treatment_Type_Id: number;
    public Date_Time: Date;
    public Baby_Id: string;
    public Note: string;

    public TreatmentType:TreatmentType;
}