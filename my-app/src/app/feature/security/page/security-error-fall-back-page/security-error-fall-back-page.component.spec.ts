import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityErrorFallBackPageComponent } from './security-error-fall-back-page.component';

describe('SecurityErrorFallBackPageComponent', () => {
  let component: SecurityErrorFallBackPageComponent;
  let fixture: ComponentFixture<SecurityErrorFallBackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityErrorFallBackPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecurityErrorFallBackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
