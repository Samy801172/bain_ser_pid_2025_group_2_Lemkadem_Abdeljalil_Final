import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberListPageComponent } from './member-list-page.component';

describe('MemberListPageComponent', () => {
  let component: MemberListPageComponent;
  let fixture: ComponentFixture<MemberListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
