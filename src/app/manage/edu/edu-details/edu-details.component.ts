import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ManageService } from '../../../service/manage.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edu-details',
  templateUrl: './edu-details.component.html',
  styleUrls: ['./edu-details.component.scss'],
  providers: [ManageService]
})
export class EduDetailsComponent implements OnInit {

  public isEdit: boolean = false;
  public title: string = '添加';
  public eid;
  public eduBackgroundDetails: any = {
    educationalbackground_name: '',
    educationalbackground_value: 0,
  };
  public infoReady: boolean = false;
  private typeHash: object = {
    'edu': 'educationalbackground',
    'cert': 'certification',
    'class': 'class',
    'department': 'department',
    'position': 'position',
    'skill': 'skill'
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private manageService: ManageService,
    private myLocation: Location
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.isEdit = params["eid"] ? true : false;
      this.eid = params['eid'];
      this.title = this.isEdit ? '编辑' : '添加';

      if (this.isEdit) {
        this.getEduBackgroundDetails();
      }
    });
  }

  @ViewChild('myForm') form;

  ngAfterViewInit() {
    this.form.control.valueChanges.subscribe(values => this.checkInfo(values));
  }

  backClicked() {
    this.myLocation.back();
  }

  getEduBackgroundDetails() {
    return this.manageService.getDetails('edu',Number(this.eid)).then((data) => {
      this.eduBackgroundDetails = data;
    })
  }


  checkInfo(event) {

    if (this.isEdit) {
      this.infoReady = true;
    }
    if (!this.isEdit) {
      this.infoReady = !!(event.name && event.growth);
    }
  }

  addEduBackground() {
    if (!this.infoReady) return;

    this.manageService.addDetails('edu',this.eduBackgroundDetails).then(data => {
      alert('增加成功！');
      this.router.navigate(['/master/manage/edu']);
    }).catch(e => {
      alert(e)
    })
  }

  editEduBackground() {

    this.manageService.editDetails('edu',this.eduBackgroundDetails).then(data => {
      alert('修改成功！');
     this.router.navigate(['/master/manage/edu']);
    }).catch(e => {
      alert(e)
    })
  }

}
