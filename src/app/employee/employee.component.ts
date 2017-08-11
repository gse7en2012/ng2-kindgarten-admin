import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  public employeeList: any = [];
  public rows: number = 0;
  public keyword: string;
  public page: number = 1;
  public pageSize: number = 40;
  public addTime: string;
  public currentEmployeeName: string;
  public currentEmployeeKg: string;
  public startCount: number = 1;
  public endCount: number = this.pageSize * this.page;
  public pageButtons: any = [];
  public nextPageEnable: boolean = true;
  public prevPageEnable: boolean = false;
  public qrcodeShow: boolean = false;
  public codeUri: string = 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=130767599,487081351&fm=58';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.searchEmployee();
  }

  searchEmployee() {
    this.employeeService.getEmployeeList(this.page - 1, this.pageSize, this.keyword).then(data => {
      this.employeeList = data.employee_list;

      this.employeeList.forEach((item) => {
        item.employee_wx_is_bind_s = item.employee_wx_is_bind == 1 ? '是' : '否';
        item.employee_sex_s = item.employee_sex == 1 ? '男' : '女';
        item.employee_state_s = item.employee_state == 1 ? '是' : '否';
        item.employee_is_gm_s = item.employee_is_gm == 1 ? '是' : '否';
      })

      this.rows = Number(data.total_rows);
      this.startCount = (this.page - 1) * this.pageSize + 1;
      this.endCount = this.page * this.pageSize;
      this.renderPageNextAndPrev();
      this.renderPageButtons();
    }).catch(e => {
      console.log(`%c${e}`, 'background: #c7273e; color: #fff');
    });
  }


  renderPageNextAndPrev() {
    this.nextPageEnable = true;
    this.prevPageEnable = true;
    if (this.page <= 1) this.prevPageEnable = false;
    if (this.page + 1 > Math.floor(this.rows / this.pageSize)) this.nextPageEnable = false;
    if (this.employeeList.length === 0) (this.prevPageEnable = false) && (this.nextPageEnable = false);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.searchEmployee();
    }
  }
  onChange(v) {
    console.log(this.pageSize);
    this.searchEmployee();
  }

  nextPage() {
    if (this.page + 1 <= Math.floor(this.rows / this.pageSize)) {
      this.page++;
      this.searchEmployee();
    }
  }

  jumpPage(page) {
    if (this.page != page) {
      this.page = page;
      this.searchEmployee();
    }
  }

  renderPageButtons() {
    this.pageButtons = [];
    const hasPrveBtn = this.page - 1 > 0;
    const hasNextBtn = this.page + 1 <= Math.floor(this.rows / this.pageSize);

    if (hasPrveBtn) this.pageButtons.push({ cur: false, num: this.page - 1 })
    if (true) this.pageButtons.push({ cur: true, num: this.page })
    if (hasNextBtn) this.pageButtons.push({ cur: false, num: this.page + 1 })
  }

  deleteEmployee(eId) {
    if (confirm('确定删除？'))
      this.employeeService.deleteEmployee(eId).then((data) => {
        alert('删除成功！');
        this.searchEmployee();
      }).catch(e => {
        alert('删除出错！')
      });
  }

  getWechatQrcodeTicket(employee){
    this.employeeService.getWechatQrcodeTicket(employee.employee_id).then((ticket)=>{
      this.codeUri=`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`;
      this.qrcodeShow=true;
      this.currentEmployeeName=employee.employee_name;
      this.currentEmployeeKg=employee.employee_kindergarten_name
    })
  }

  onClickedOutside(event){
    console.log(event);
    
    this.qrcodeShow=false;
  }


}
