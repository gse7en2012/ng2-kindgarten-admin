import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  public adminInfo: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.adminInfo = this.userService.getAdminInfo();
  }

}
