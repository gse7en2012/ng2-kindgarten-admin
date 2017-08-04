import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ManageService } from '../../service/manage.service';

@Component({
  selector: 'app-edu',
  templateUrl: './edu.component.html',
  styleUrls: ['./edu.component.scss'],
  providers: [ManageService]
})
export class EduComponent implements OnInit {

  public eduBackgroundList: any = [];
  public rows: number = 0;
  public page: number = 1;
  public pageSize: number = 40;
  public addTime: string;
  public startCount: number = 1;
  public endCount: number = this.pageSize * this.page;
  public pageButtons: any = [];
  public nextPageEnable: boolean = true;
  public prevPageEnable: boolean = false;
  private typeHash: object = {
    'edu': 'educationalbackground',
    'cert': 'certification',
    'class': 'class',
    'department': 'department',
    'position': 'position',
    'skill': 'skill'
  }

  constructor(private manageService: ManageService) { }

  ngOnInit() {
    this.searchEduBackground();
  }

  searchEduBackground() {
    this.manageService.getList('edu',this.page - 1, this.pageSize).then(data => {
      this.eduBackgroundList = data[`${this.typeHash['edu']}_list`];
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
    if (this.eduBackgroundList.length === 0) (this.prevPageEnable = false) && (this.nextPageEnable = false);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.searchEduBackground();
    }
  }
  onChange(v) {
    console.log(this.pageSize);
    this.searchEduBackground();
  }

  nextPage() {
    if (this.page + 1 <= Math.floor(this.rows / this.pageSize)) {
      this.page++;
      this.searchEduBackground();
    }
  }

  jumpPage(page) {
    if (this.page != page) {
      this.page = page;
      this.searchEduBackground();
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

  deleteEduBackground(eId) {
    if (confirm('确定删除？'))
      this.manageService.deleteDetails('edu',eId).then((data) => {
        alert('删除成功！');
        this.searchEduBackground();
      }).catch(e => {
        alert('删除出错！')
      });
  }

  
}
