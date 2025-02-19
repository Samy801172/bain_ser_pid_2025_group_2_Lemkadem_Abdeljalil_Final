import {FormControl} from "@angular/forms";

export interface FormControlSimpleConfig{
label:string;
formControl:FormControl
inputType: string;
placeholder: string;
readonly? : boolean;
}
