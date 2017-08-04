import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ManageService } from '../../service/manage.service';

@Component({
  selector: 'app-cert',
  templateUrl: './cert.component.html',
  styleUrls: ['./cert.component.css'],
  providers: [ManageService]
})
export class CertComponent implements OnInit {

  public certificationList: any = [];
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
    this.searchCertification();
  }

  searchCertification() {
    this.manageService.getList('cert',this.page - 1, this.pageSize).then(data => {
      this.certificationList = data[`${this.typeHash['cert']}_list`];
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
    if (this.certificationList.length === 0) (this.prevPageEnable = false) && (this.nextPageEnable = false);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.searchCertification();
    }
  }
  onChange(v) {
    console.log(this.pageSize);
    this.searchCertification();
  }

  nextPage() {
    if (this.page + 1 <= Math.floor(this.rows / this.pageSize)) {
      this.page++;
      this.searchCertification();
    }
  }

  jumpPage(page) {
    if (this.page != page) {
      this.page = page;
      this.searchCertification();
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

  deleteCearification(eId) {
    if (confirm('确定删除？'))
      this.manageService.deleteDetails('cert',eId).then((data) => {
        alert('删除成功！');
        this.searchCertification();
      }).catch(e => {
        alert('删除出错！')
      });
  }

}
