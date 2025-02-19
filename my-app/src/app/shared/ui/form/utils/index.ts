
import { FormGroup, ValidationErrors } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { FormError } from "../data/interface";
import { DestroyRef } from "@angular/core";
import { map } from "rxjs/operators";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { HandleFormErrorFn } from "../type/idex";

export const handleFormError: HandleFormErrorFn = (forme: FormGroup, obs: BehaviorSubject<FormError[]>, destroyRef?: DestroyRef): void => {
  forme.valueChanges.pipe(
    takeUntilDestroyed(destroyRef),
    map((value: any) => {
      const result: FormError[] = [];
      Object.keys(forme.controls).forEach((key: string) => { // Correction ici
        const controlErrors: ValidationErrors | null = forme.get(key)?.errors ?? null; // Correction ici
        if (controlErrors) {
          Object.keys(controlErrors).forEach((keyError: string) => {
            result.push({
              control: key,
              error: keyError,
              value: controlErrors[keyError]
            });
          });
        }
      });
      obs.next(result);
    })
  ).subscribe();
}
