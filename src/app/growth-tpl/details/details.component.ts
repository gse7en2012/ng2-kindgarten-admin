import { Component, OnInit, OnChanges, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GrowthService } from '../../service/growth.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [GrowthService]
})
export class GrowthTplDetailsComponent implements OnInit {

  public isEdit: boolean = false;
  public title: string = '添加';
  public eid;
  public item: string;
  public itemName: string;
  public details: any = {
    // kgsgrowthvalueitem_name:'',
    // kgsgrowthvalueitem_value:0,
    // kgsgrowthvalueitem_dscp:''
  };
  public infoReady: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private growthService: GrowthService,
    private myLocation: Location
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.isEdit = params["eid"] ? true : false;
      this.eid = params['eid'];
      this.title = this.isEdit ? '编辑' : '添加';
      this.itemName = '成长值自定义项';

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
    return this.growthService.getGrowthValueTplDetails(Number(this.eid)).then((data) => {
      this.details = data;
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
    postDetails[`kgsgrowthvalueitem_name`] = this.details.kgsgrowthvalueitem_name;
    postDetails[`kgsgrowthvalueitem_value`] = this.details.kgsgrowthvalueitem_value;
    postDetails[`kgsgrowthvalueitem_dscp`] = this.details.kgsgrowthvalueitem_dscp;
   
    this.growthService.addGrowthValueTplDetails(postDetails).then(data => {
      alert('增加成功！');
      this.router.navigate([`/master/growth_item`]);
    }).catch(e => {
      alert(e)
    })
  }

  editDetails() {
    const postDetails = {};
    postDetails[`kgsgrowthvalueitem_id`]=this.eid;
    postDetails[`kgsgrowthvalueitem_name`] = this.details.kgsgrowthvalueitem_name;
    postDetails[`kgsgrowthvalueitem_value`] = this.details.kgsgrowthvalueitem_value;
    postDetails[`kgsgrowthvalueitem_dscp`] = this.details.kgsgrowthvalueitem_dscp;
    this.growthService.editGrowthValueTplDetails( postDetails).then(data => {
      alert('修改成功！');
      this.router.navigate([`/master/growth_item`]);
    }).catch(e => {
      alert(e)
    })
  }


}
