/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EduComponent } from './edu.component';

describe('EduComponent', () => {
  let component: EduComponent;
  let fixture: ComponentFixture<EduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
