import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { KgService } from '../../service/kg.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [EmployeeService, KgService]
})
export class EmployeeDetailsComponent implements OnInit {

  public isEdit: boolean = false;
  public title: string = '添加';
  public eid;
  public epDetails: any = {
    employee_state: 1,
    employee_sex: 1,
    employee_is_gm: 0,
    employee_wx_is_bind: 0
  };
  public infoReady: boolean = false;
  public kgList: any = [];
  public employeesKg: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private kgService: KgService,
    private myLocation:Location
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.isEdit = params["eid"] ? true : false;
      this.eid = params['eid'];
      this.title = this.isEdit ? '编辑' : '添加';
      this.kgService.getkgList().then((kgList) => {
        this.kgList = kgList.kindergarten_list;
        if (this.isEdit) {
          this.getEpDetails().then(() => {
            const kgId = this.epDetails.employee_kindergarten_id;
            this.kgList.forEach((kg) => {
              if (kg.kindergarten_id == kgId) this.employeesKg = kg;
            })
          });
        }
        if (!this.isEdit) this.employeesKg = this.kgList[0];
      })
    });



  }

  @ViewChild('myForm') form;

  ngAfterViewInit() {
    this.form.control.valueChanges.subscribe(values => this.checkInfo(values));
  }

  backClicked() {
        this.myLocation.back();
    }

  getEpDetails() {
    return this.employeeService.getEmployeeDetails(Number(this.eid)).then((data) => {
      this.epDetails = data;
    })
  }


  checkInfo(event) {

    if (this.isEdit) {
      this.infoReady = true;
    }
    if (!this.isEdit) {
      this.infoReady = !!(event.name && event.phone && event.sex && event.state && event.kg);
    }
  }

  addEp() {
    if (!this.infoReady) return;

    const epInfo = {
      employee_name: this.epDetails.employee_name,
      employee_phone_number: this.epDetails.employee_phone_number,
      employee_growth_value: this.epDetails.employee_growth_value,
      employee_level: this.epDetails.employee_level,
      employee_kindergarten_id: this.employeesKg.kindergarten_id,
      employee_sex: this.epDetails.employee_sex,
      employee_state: this.epDetails.employee_state,
      employee_is_gm: this.epDetails.employee_is_gm,
      employee_wx_is_bind: this.epDetails.employee_wx_is_bind
    };

    /**
     * employee_realname:string(64), // 员工名称
    employee_phone_number:string(16), // 员工联系电话
    employee_wx_is_band:int, // 是否绑定了微信，0-否 1-是
    employee_growth_value:int, // 成长值
    employee_level:, // 员工等级
    employee_wx_nickname:string(64), // 员工微信昵称
    employee_kindergarten_id:int, // 所属幼儿园编号
    employee_add_time:datetime, // 添加时间
    employee_adder:string(64), // 添加者
    employee_sex:int, // 员工性别，0-女 1-男 2-未知
    employee_is_gm:int, // 是否为该幼儿园积分管理者，0-否 1-是
    employee_state:int, // 是否在职，0-否 1-是
    
     */



    this.employeeService.addEmployee(epInfo).then(data => {
      alert('增加成功！');
      this.router.navigate(['/master/employee']);
    }).catch(e => {
      alert(e)
    })
  }

  editEp() {

    const epInfo = {
      employee_id: this.epDetails.employee_id,
      employee_name: this.epDetails.employee_name,
      employee_phone_number: this.epDetails.employee_phone_number,
      employee_growth_value: this.epDetails.employee_growth_value,
      employee_level: this.epDetails.employee_level,
      employee_kindergarten_id: this.employeesKg.kindergarten_id,
      employee_sex: this.epDetails.employee_sex,
      employee_state: this.epDetails.employee_state,
      employee_is_gm: this.epDetails.employee_is_gm,
      employee_wx_is_bind: this.epDetails.employee_wx_is_bind
    };
    this.employeeService.editEmployeeDetails(epInfo).then(data => {
      alert('修改成功！');
       this.router.navigate(['/master/employee']);
    }).catch(e => {
      alert(e)
    })
  }

}
