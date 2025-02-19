import {FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {FormError} from "../data/interface";
import {DestroyRef} from "@angular/core";

export type HandleFormErrorFn = (form: FormGroup,obs : BehaviorSubject<FormError[]>, destroyRef ?:DestroyRef) => void ;
