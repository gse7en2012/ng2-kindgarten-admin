import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';
import { CookieModule } from 'ngx-cookie';
import { AuthGuard } from './auth-guard';
import { UserService } from './service/user.service';
import { ExtendedHttpService } from './service/extend-http.service';
import { ClickOutsideModule } from 'ng-click-outside';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { DesktopComponent } from './desktop/desktop.component';

import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailsComponent } from './employee/details/details.component';


import { GrowthComponent } from './growth/growth.component';
import { RankComponent } from './rank/rank.component';
import { MonthReportComponent } from './month-report/month-report.component';
import { SysSettingComponent } from './sys-setting/sys-setting.component';

import { ManageComponent } from './manage/manage.component';
import { DetailsComponent } from './manage/details/details.component';
import { TestFormComponent } from './test-form/test-form.component';
import { GrowthTplComponent } from './growth-tpl/growth-tpl.component';
import { GrowthTplDetailsComponent } from './growth-tpl/details/details.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  // { path: 'master', component: MasterPageComponent },
]
const masterRoutes: Routes = [
  {
    path: 'master', component: MasterPageComponent, children: [
      { path: 'desktop', component: DesktopComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'employee/details', component: EmployeeDetailsComponent },
      { path: 'employee/details/:eid', component: EmployeeDetailsComponent },

      { path: 'growth', component: GrowthComponent },
      { path: 'rank', component: RankComponent },
      { path: 'report', component: MonthReportComponent },
      { path: 'setting', component: SysSettingComponent },

      { path: 'manage/:item', component: ManageComponent },
      { path: 'manage/:item/details', component: DetailsComponent },
      { path: 'manage/:item/details/:eid', component: DetailsComponent },

      { path: 'growth_item', component: GrowthTplComponent },
      { path: 'growth_item/details', component: GrowthTplDetailsComponent },
      { path: 'growth_item/details/:eid', component: GrowthTplDetailsComponent },

      // { path: 'manage/edu', component: EduComponent },
      // { path: 'manage/edu/details', component: EduDetailsComponent },
      // { path: 'manage/edu/details/:eid', component: EduDetailsComponent },

      // { path: 'manage/cert', component: CertComponent },
      // { path: 'manage/cert/details', component: CertDetailsComponent },
      // { path: 'manage/cert/details/:eid', component: CertDetailsComponent },
      // { path: 'manage/skill', component: SkillComponent },
      // { path: 'manage/position', component: PositionComponent },
      // { path: 'manage/department', component: DepartmentComponent },
      // { path: 'manage/class', component: ClassComponent },


    ], canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MasterPageComponent,
    DesktopComponent,
    EmployeeComponent,
    EmployeeDetailsComponent,
    GrowthComponent,
    RankComponent,
    MonthReportComponent,
    SysSettingComponent,
    ManageComponent,
    DetailsComponent,
    TestFormComponent,
    GrowthTplComponent,
    GrowthTplDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ClickOutsideModule,
    MyDatePickerModule,
    CookieModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(masterRoutes)
  ],
  providers: [AuthGuard, UserService, { provide: Http, useClass: ExtendedHttpService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
