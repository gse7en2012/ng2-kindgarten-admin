import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  myForm: FormGroup;
  sky: AbstractControl;
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sky': ['', Validators.required]
    })
    this.sky = this.myForm.controls['sky'];
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log(value);
  }

}
