import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {

  public hideSubNav: boolean = true;
  public navMinHeight: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.setNavCurrent()
    this.navMinHeight = (window.innerHeight - 60) + 'px';
    this.activatedRoute.url.subscribe((params) => {
      console.log(params)
    });
  }

  toggleSubNav() {
    this.hideSubNav = !this.hideSubNav;
  }

  setNavCurrent() {
    const subNavSeed = ['edu', 'cert', 'skill', 'position', 'department', 'class'];
    const path = window.location.pathname.split('/').reverse()[0];

    if (subNavSeed.indexOf(path) !== -1) {
      this.hideSubNav = false;
    }
  }

}
