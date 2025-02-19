import { Component, Input } from '@angular/core';
import {CardConfig} from '../../model';
import {Title} from '@angular/platform-browser';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() config?:CardConfig;
  protected readonly Title = Title;
  in: any;
  subTitle: string | undefined;
}
