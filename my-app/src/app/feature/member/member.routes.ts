import {Routes} from '@angular/router';
import {AppNode} from '@shared-router';

export const memberRoutes:Routes = [
  {
    path:'',
    loadComponent: ()=> import('./page').then(c=>c.MemberListPageComponent)
  },
  {
    path:AppNode.DETAIL,
    loadComponent: ()=> import('./page').then(c=>c.MemberDetailPageComponent)
  }
]
