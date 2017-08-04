import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ManageService } from '../../../service/manage.service';

import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-cert-details',
  templateUrl: './cert-details.component.html',
  styleUrls: ['./cert-details.component.scss'],
  providers: [ManageService]
})
export class CertDetailsComponent implements OnInit {

  public isEdit: boolean = false;
  public title: string = '添加';
  public eid;
  public certDetails: any = {
    certification_name: '',
    certification_value: 0,
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
        this.getCertDetails();
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

  getCertDetails() {
    return this.manageService.getDetails('cert', Number(this.eid)).then((data) => {
      this.certDetails = data;
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

  addCert() {
    if (!this.infoReady) return;

    this.manageService.addDetails('cert', this.certDetails).then(data => {
      alert('增加成功！');
      this.router.navigate(['/master/manage/cert']);
    }).catch(e => {
      alert(e)
    })
  }

  editCert() {

    this.manageService.editDetails('cert', this.certDetails).then(data => {
      alert('修改成功！');
      this.router.navigate(['/master/manage/cert']);
    }).catch(e => {
      alert(e)
    })
  }

}
