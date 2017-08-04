import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EudDetailsComponent } from './eud-details.component';

describe('EudDetailsComponent', () => {
  let component: EudDetailsComponent;
  let fixture: ComponentFixture<EudDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EudDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EudDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
