import {Component, Input} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-member-detail-page',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './member-detail-page.component.html',
  styleUrl: './member-detail-page.component.scss'
})
export class MemberDetailPageComponent {
@Input() id!:string;
}
