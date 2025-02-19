import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {FormControlSimpleConfig} from '../../data/config';

@Component({
  selector: 'app-float-label-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './float-label-input.component.html',
  styleUrls: ['./float-label-input.component.scss']
})
export class FloatLabelInputComponent {
  @Input({ required: true }) config!: FormControlSimpleConfig;
  public inputFocus: boolean = false;
}
