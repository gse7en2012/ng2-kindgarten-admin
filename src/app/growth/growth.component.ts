import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-growth',
  templateUrl: './growth.component.html',
  styleUrls: ['./growth.component.scss']
})
export class GrowthComponent implements OnInit {


  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    width: '210px',
    markCurrentDay: true
  };
  private startDate: Object = { 
     date: {
      year: (new Date().getFullYear()), month: new Date().getMonth(), day: new Date().getDate()
    }
  };
  private endDate: Object = {
    date: {
      year: (new Date().getFullYear()), month: new Date().getMonth()+1, day:31
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
