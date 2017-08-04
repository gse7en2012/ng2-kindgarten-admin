import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {

  public hideSubNav: boolean = true;
  public navMinHeight: string;
  public adminInfo:any;

  constructor(private activatedRoute: ActivatedRoute,private userService:UserService) { }

  ngOnInit() {
    this.setNavCurrent()
    this.navMinHeight = (window.innerHeight - 60) + 'px';
    this.activatedRoute.url.subscribe((params) => {
      console.log(params)
    });
    this.adminInfo=this.userService.getAdminInfo();
  }

  toggleSubNav() {
    this.hideSubNav = !this.hideSubNav;
  }

  setNavCurrent() {
    const subNavSeed = ['edu', 'cert', 'skill', 'position', 'department', 'class'];
    const path=window.location.pathname;

    subNavSeed.forEach((item)=>{
      if(path.indexOf(item)!=-1) this.hideSubNav=false;
    })

  }

}
