import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityFormComponent } from './security-form.component';

describe('SecurityFormComponent', () => {
  let component: SecurityFormComponent;
  let fixture: ComponentFixture<SecurityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
