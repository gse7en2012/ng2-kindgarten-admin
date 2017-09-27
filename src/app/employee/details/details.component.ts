import { Component, OnInit, OnChanges, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { KgService } from '../../service/kg.service';
import { ManageService } from '../../service/manage.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [EmployeeService, KgService, ManageService]
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
  public classList: object[] = [];
  public departmentList: any = [];
  public bgList: any = [];
  public positionList: any = [];
  public skillList: any = [];
  public certList: any = [];
  public employeesKg: any = {};
  public employeesBg: any = {};
  public employeesSkill: any = {};
  public employeesClass: any = {};
  public employeesCert: any = {};
  public employeesDepartment: any = {};
  public employeesPosition: any = {};


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private kgService: KgService,
    private manageService: ManageService,
    private myLocation: Location,
    private _ngZone: NgZone
  ) { }

  changeCheckbok(event) { // right now: ['1','3']
    console.log(this.employeesSkill);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.isEdit = params["eid"] ? true : false;
      this.eid = params['eid'];
      this.title = this.isEdit ? '编辑' : '添加';


      this.getManageList().then(() => {
        if (this.isEdit) {
          this.getEpDetails().then(() => {
            const kgId = this.epDetails.employee_kindergarten_id;
            this.employeesKg = this.kgList.find((item) => { return item.kindergarten_id == kgId; });
            this.employeesBg = this.bgList.find((item) => { return item.educationalbackground_id == this.epDetails.employee_educationalbackground_id; });
            // this.employeesSkill = this.skillList.find((item) => { return item.skill_id == this.epDetails.employee_; });
            this.employeesClass = this.classList.find((item) => { return item['class_id'] == this.epDetails.employee_class_id; });
            // this.employeesCert = this.certList.find((item) => { return item.certification_id == this.epDetails.employee_; });
            this.employeesDepartment = this.departmentList.find((item) => { return item.department_id == this.epDetails.employee_department_id; });
            this.employeesPosition = this.positionList.find((item) => { return item.position_id == this.epDetails.employee_position_id; });


            this.epDetails.employee_certification_id_list.map((item) => item.employeehascertification_certification_id).forEach((selectId) => {
              this.certList.forEach((item, index) => {
                if (item.certification_id === selectId) item.checked = true;
              })
            })

            this.epDetails.employee_skill_id_list.map((item) => item.employeehasskill_skill_id).forEach((selectId) => {
              this.skillList.forEach((item, index) => {
                if (item.skill_id === selectId) item.checked = true;
              })
            })

          });
        }
        if (!this.isEdit) {
          this.employeesKg = this.kgList[0];
          this.employeesBg = this.bgList[0];
          this.employeesClass = this.classList[0];
          this.employeesSkill = [];
          this.employeesCert = [];
          this.employeesDepartment = this.departmentList[0];
          this.employeesPosition = this.positionList[0];
        }
      });

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

  getManageList() {
    return Promise.all([
      this.kgService.getkgList(),
      this.manageService.getList('class'),
      this.manageService.getList('department'),
      this.manageService.getList('position'),
      this.manageService.getList('skill'),
      this.manageService.getList('cert'),
      this.manageService.getList('edu')
    ]).then((list) => {
      this.kgList = list[0].kindergarten_list;
      this.classList = list[1].class_list;
      this.departmentList = list[2].department_list;
      this.positionList = list[3].position_list;
      this.skillList = list[4].skill_list;
      this.certList = list[5].certification_list;
      this.bgList = list[6].educationalbackground_list;
    })
  }

  changeCertCheckbox(i) {
    this.certList[i].checked = !this.certList[i].checked;
  }
  changeSkillCheckbox(i) {
    this.skillList[i].checked = !this.skillList[i].checked;
  }

  checkInfo(event) {

    if (this.isEdit) {
      this.infoReady = true;
    }
    if (!this.isEdit) {
      this.infoReady = !!(event.name && event.kg);
    }
  }

  addEp() {
    if (!this.infoReady) return;

    const skillId = this.skillList.filter(opt => opt.checked).map(opt => opt.skill_id);
    const certId = this.certList.filter(opt => opt.checked).map(opt => opt.certification_id);
    const epInfo = {
      employee_name: this.epDetails.employee_name,
      employee_phone_number: this.epDetails.employee_phone_number,
      employee_growth_value: this.epDetails.employee_growth_value,
      employee_level: this.epDetails.employee_level,
      employee_kindergarten_id: this.employeesKg.kindergarten_id,
      employee_sex: this.epDetails.employee_sex,
      employee_state: this.epDetails.employee_state,
      employee_is_gm: this.epDetails.employee_is_gm,
      employee_wx_is_bind: this.epDetails.employee_wx_is_bind,
      educationalbackground_id: this.employeesBg?this.employeesBg.educationalbackground_id:null,
      certification_id_list: certId,
      skill_id_list: skillId,
      position_id: this.employeesPosition?this.employeesPosition.position_id:null,
      department_id:this.employeesDepartment?this.employeesDepartment.department_id:null,
      class_id: this.employeesClass?this.employeesClass.class_id:null
    };




    this.employeeService.addEmployee(epInfo).then(data => {
      alert('增加成功！');
      this.router.navigate(['/master/employee']);
    }).catch(e => {
      alert(e)
    })
  }

  editEp() {
    const skillId = this.skillList.filter(opt => opt.checked).map(opt => opt.skill_id);
    const certId = this.certList.filter(opt => opt.checked).map(opt => opt.certification_id);
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
      employee_wx_is_bind: this.epDetails.employee_wx_is_bind,
      educationalbackground_id: this.employeesBg?this.employeesBg.educationalbackground_id:null,
      certification_id_list: certId,
      skill_id_list: skillId,
      position_id: this.employeesPosition?this.employeesPosition.position_id:null,
      department_id:this.employeesDepartment?this.employeesDepartment.department_id:null,
      class_id: this.employeesClass?this.employeesClass.class_id:null
    };
    this.employeeService.editEmployeeDetails(epInfo).then(data => {
      alert('修改成功！');
      this.router.navigate(['/master/employee']);
    }).catch(e => {
      alert(e)
    })
  }

}
