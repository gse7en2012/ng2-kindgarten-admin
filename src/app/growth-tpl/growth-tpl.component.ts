import { Component, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Router, CanActivate } from '@angular/router';
import { GrowthService } from '../service/growth.service';

@Component({
  selector: 'app-growth-tpl',
  templateUrl: './growth-tpl.component.html',
  styleUrls: ['./growth-tpl.component.scss'],
  providers: [GrowthService]
})
export class GrowthTplComponent implements OnInit {

  public growthvalueList: any = [];
  public rows: number = 0;
  public keyword: string;
  public page: number = 1;
  public pageSize: number = 40;

  public startCount: number = 1;
  public endCount: number = this.pageSize * this.page;
  public pageButtons: any = [];
  public nextPageEnable: boolean = true;
  public prevPageEnable: boolean = false;



  constructor(
    private growthService: GrowthService
  ) { }

  ngOnInit() {
    this.searchGrowthValueTplList()
  }


  renderPageNextAndPrev() {
    this.nextPageEnable = true;
    this.prevPageEnable = true;
    if (this.page <= 1) this.prevPageEnable = false;
    if (this.page >= Math.ceil(this.rows / this.pageSize)) this.nextPageEnable = false;
    if (this.growthvalueList.length === 0) (this.prevPageEnable = false) && (this.nextPageEnable = false);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.searchGrowthValueTplList();
    }
  }
  nextPage() {
    if (this.page + 1 <= Math.floor(this.rows / this.pageSize)) {
      this.page++;
      this.searchGrowthValueTplList();
    }
  }



  onChange(v) {
    console.log(this.pageSize);
    this.searchGrowthValueTplList();
  }

  renderPageButtons() {
    this.pageButtons = [];
    const hasPrveBtn = this.page - 1 > 0;
    const hasNextBtn = this.page + 1 <= Math.ceil(this.rows / this.pageSize);
    if (hasPrveBtn) this.pageButtons.push({ cur: false, num: this.page - 1 })
    if (true) this.pageButtons.push({ cur: true, num: this.page })
    if (hasNextBtn) this.pageButtons.push({ cur: false, num: this.page + 1 })
  }

  searchGrowthValueTplList() {
    this.growthService.getGrowthValueTplList(this.page - 1, this.pageSize, this.keyword).then(data => {
      this.growthvalueList = data.growthvalueitem_list;
      // this.growthvalueList.forEach((item) => {
      //   item.employee_wx_is_bind_s = item.employee_wx_is_bind == 1 ? '是' : '否';
      //   item.employee_sex_s = item.employee_sex == 1 ? '男' : '女';
      //   item.employee_state_s = item.employee_state == 1 ? '是' : '否';
      //   item.employee_is_gm_s = item.employee_is_gm == 1 ? '是' : '否';
      // })

      this.rows = Number(data.total_rows);
      this.startCount = (this.page - 1) * this.pageSize + 1;
      this.endCount = this.page * this.pageSize;
      this.renderPageNextAndPrev();
      this.renderPageButtons();
    }).catch(e => {
      console.log(`%c${e}`, 'background: #c7273e; color: #fff');
    });
  }

  deleteRow(id){
    if (confirm('确定删除？'))
    this.growthService.deleteGrowthValueTplDetails(id).then(data => {
      alert('删除成功！');
      this.searchGrowthValueTplList();
    }).catch(e => {
      alert(e)
    })
  }

}
