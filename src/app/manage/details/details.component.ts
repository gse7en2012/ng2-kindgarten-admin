import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ManageService } from '../../service/manage.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [ManageService]
})
export class DetailsComponent implements OnInit {

  public isEdit: boolean = false;
  public title: string = '添加';
  public eid;
  public item: string;
  public itemName: string;
  public details: any = {};

  public infoReady: boolean = false;
  private typeHash: object = {
    'edu': 'educationalbackground',
    'cert': 'certification',
    'class': 'class',
    'department': 'department',
    'position': 'position',
    'skill': 'skill'
  }
  private typeNameHash: object = {
    'edu': '学历',
    'cert': '证书',
    'class': '班级',
    'department': '部门',
    'position': '职位',
    'skill': '技能'
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
      this.itemName = this.typeNameHash[params["item"]];
      this.item = params["item"];

      this.details[`${this.item}_name`] = '';

      (this.item == 'department' || this.item == 'class') ? this.details[`${this.item}_total_members`] = 0 : this.details[`${this.item}_value`] = 0;

      if (this.isEdit) {
        this.getDetails();
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

  getDetails() {
    return this.manageService.getDetails(this.item, Number(this.eid)).then((data) => {
      this.details = {
        value: data[`${this.typeHash[this.item]}_value`]|| data[`${this.typeHash[this.item]}_total_members`],
        id: data[`${this.typeHash[this.item]}_id`],
        name: data[`${this.typeHash[this.item]}_name`],
      }
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

  addDetails() {
    if (!this.infoReady) return;
    const postDetails = {};
    postDetails[`${this.typeHash[this.item]}_name`] = this.details.name;
    // postDetails[`${this.typeHash[this.item]}_id`] = this.details.id;
    if (this.item == 'class' || this.item == 'department') {
      postDetails[`${this.typeHash[this.item]}_total_members`] = this.details.value;
    } else {
      postDetails[`${this.typeHash[this.item]}_value`] = this.details.value;
    }
    this.manageService.addDetails(this.item, postDetails).then(data => {
      alert('增加成功！');
      this.router.navigate([`/master/manage/${this.item}`]);
    }).catch(e => {
      alert(e)
    })
  }

  editDetails() {
    const postDetails = {};
    postDetails[`${this.typeHash[this.item]}_name`] = this.details.name;
    postDetails[`${this.typeHash[this.item]}_id`] = this.details.id;
    if (this.item == 'class' || this.item == 'department') {
      postDetails[`${this.typeHash[this.item]}_total_members`] = this.details.value;
    } else {
      postDetails[`${this.typeHash[this.item]}_value`] = this.details.value;
    }
    this.manageService.editDetails(this.item, postDetails).then(data => {
      alert('修改成功！');
      this.router.navigate([`/master/manage/${this.item}`]);
    }).catch(e => {
      alert(e)
    })
  }

}
