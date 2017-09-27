import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthTplComponent } from './growth-tpl.component';

describe('GrowthTplComponent', () => {
  let component: GrowthTplComponent;
  let fixture: ComponentFixture<GrowthTplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthTplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthTplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
