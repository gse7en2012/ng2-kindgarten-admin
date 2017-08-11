import { Component, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Router, CanActivate } from '@angular/router';
import { GrowthService } from '../service/growth.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss'],
  providers: [GrowthService]
})
export class RankComponent implements OnInit {


  public myDatePickerOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    width: '210px',
    markCurrentDay: true
  };
  // private startDate: Object = {
  //   date: {
  //     year: (new Date().getFullYear()), month: new Date().getMonth(), day: new Date().getDate()
  //   }
  // };
  // private endDate: Object = {
  //   date: {
  //     year: (new Date().getFullYear()), month: new Date().getMonth() + 1, day: new Date().getDate()
  //   }
  // };

  public rankList: any = [];
  public rows: number = 0;
  public keyword: string;
  public page: number = 1;
  public pageSize: number = 40;
  public startTime: string;
  public endTime: string;

  public startCount: number = 1;
  public endCount: number = this.pageSize * this.page;
  public pageButtons: any = [];
  public nextPageEnable: boolean = true;
  public prevPageEnable: boolean = false;



  constructor(
    private growthService: GrowthService
  ) { }

  ngOnInit() {
    this.searchRankList()
  }
  onStartDateChanged(event: IMyDateModel) {
    this.startTime = `${event.formatted} 00:00:00`;
    this.searchRankList()
  }

  onEndDateChanged(event: IMyDateModel) {
    this.endTime = `${event.formatted} 00:00:00`;
    this.searchRankList()
  }

  renderPageNextAndPrev() {
    this.nextPageEnable = true;
    this.prevPageEnable = true;
    if (this.page <= 1) this.prevPageEnable = false;
    if (this.page + 1 > Math.floor(this.rows / this.pageSize)) this.nextPageEnable = false;
    if (this.rankList.length === 0) (this.prevPageEnable = false) && (this.nextPageEnable = false);
  }


  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.searchRankList();
    }
  }
  nextPage() {
    if (this.page + 1 <= Math.floor(this.rows / this.pageSize)) {
      this.page++;
      this.searchRankList();
    }
  }

  
  onChange(v) {
    this.searchRankList();
  }

  renderPageButtons() {
    this.pageButtons = [];
    const hasPrveBtn = this.page - 1 > 0;
    const hasNextBtn = this.page + 1 <= Math.floor(this.rows / this.pageSize);

    if (hasPrveBtn) this.pageButtons.push({ cur: false, num: this.page - 1 })
    if (true) this.pageButtons.push({ cur: true, num: this.page })
    if (hasNextBtn) this.pageButtons.push({ cur: false, num: this.page + 1 })
  }

  searchRankList() {
    this.growthService.getRankList(this.page - 1, this.pageSize, this.keyword, this.startTime, this.endTime).then(data => {
      this.rankList = data.ranking_list;

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

}
