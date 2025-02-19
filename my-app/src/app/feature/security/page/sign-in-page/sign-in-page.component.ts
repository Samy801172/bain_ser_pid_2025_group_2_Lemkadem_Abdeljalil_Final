import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import { SecurityFormComponent } from '../../component/security-form/security-form.component';
import {CardComponent, FormError, InputComponent} from '../../../../shared';
import { FloatLabelInputComponent } from '../../../../shared';
import { ApiService } from '../../../../shared/api/service/api.service';
import { FormControlSimpleConfig } from '../../../../shared/ui/form/data/config';
import {CommonModule } from "@angular/common";
import {FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    CardComponent,
    FloatLabelInputComponent,
    SecurityFormComponent
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  private apiService: ApiService = inject(ApiService);

  public signInPayload = {
    username: 'hello',
    password: '',
    socialLogin: false
  };

  public formGroup: FormGroup = new FormGroup({
    //username: new FormControl(this.signInPayload.username, [Validators.maxLength(15), Validators.required]),
    password: new FormControl(this.signInPayload.password, [Validators.required])
  });

  public formControlConfigs: FormControlSimpleConfig[] = [
    {
      label: 'Identfiant',
      formControl: this.formGroup.get('username') as FormControl,
      inputType: 'text',
      placeholder: '',
      readonly: false
    },
    {
      label: 'Mot de passe',
      formControl: this.formGroup.get('password') as FormControl,
      inputType: 'password',
      placeholder: '',
    }
  ]
}

