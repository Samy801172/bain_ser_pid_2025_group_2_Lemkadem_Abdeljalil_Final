import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input({required : true}) title!: string;
  @Output() titleChange = new EventEmitter<string>;
  cpt:number = 0;

public setValue(): void {
    this.cpt++;
this.titleChange.emit(this.cpt.toString());
}
}
