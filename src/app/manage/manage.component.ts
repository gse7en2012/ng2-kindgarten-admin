import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ManageService } from '../service/manage.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  providers: [ManageService]
})
export class ManageComponent implements OnInit {

  public list: any = [];
  public rows: number = 0;
  public page: number = 1;
  public pageSize: number = 40;
  public addTime: string;
  public startCount: number = 1;
  public endCount: number = this.pageSize * this.page;
  public pageButtons: any = [];
  public nextPageEnable: boolean = true;
  public prevPageEnable: boolean = false;
  public item: string;
  public itemName: string;
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
      this.itemName = this.typeNameHash[params["item"]];
      this.item = params["item"];
      this.getList();
    });

  }

  getList() {
    this.manageService.getList(this.item, this.page - 1, this.pageSize).then(data => {
      this.rows = Number(data.total_rows);
      this.startCount = (this.page - 1) * this.pageSize + 1;
      this.endCount = this.page * this.pageSize;
      this.list = data[`${this.typeHash[this.item]}_list`].map((row) => {
        return {
          id: row[`${this.typeHash[this.item]}_id`],
          name: row[`${this.typeHash[this.item]}_name`],
          value: row[`${this.typeHash[this.item]}_value`]||row[`${this.typeHash[this.item]}_total_members`],
          add_time: row[`${this.typeHash[this.item]}_add_time`],
        }
      })
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
    if (this.list.length === 0) (this.prevPageEnable = false) && (this.nextPageEnable = false);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.getList();
    }
  }
  onChange(v) {
    console.log(this.pageSize);
    this.getList();
  }

  nextPage() {
    if (this.page + 1 <= Math.floor(this.rows / this.pageSize)) {
      this.page++;
      this.getList();
    }
  }

  jumpPage(page) {
    if (this.page != page) {
      this.page = page;
      this.getList();
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

  deleteRow(eId) {
    if (confirm('确定删除？'))
      this.manageService.deleteDetails(this.item, eId).then((data) => {
        alert('删除成功！');
        this.getList();
      }).catch(e => {
        alert('删除出错！')
      });
  }


}
