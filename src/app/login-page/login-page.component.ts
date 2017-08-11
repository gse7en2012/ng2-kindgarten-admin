import { Component, OnInit, HostListener } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [UserService]
})
export class LoginPageComponent implements OnInit {

  public username: string;
  public pass: string;

  constructor(private userService: UserService, private router: Router, ) { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  keyboardInput(event: KeyboardEvent) {
    if (event.keyCode === 13) { this.adminLogin(); }
  }

  adminLogin() {
    this.userService.adminLogin(this.username, this.pass).then(data => {
      this.router.navigate(['/master/desktop']);
    }).catch(e => {
      alert(e);
    });
  }

}
