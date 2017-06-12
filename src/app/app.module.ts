import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';


import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MasterPageComponent } from './master-page/master-page.component';
import { DesktopComponent } from './desktop/desktop.component';
import { EmployeeComponent } from './employee/employee.component';
import { GrowthComponent } from './growth/growth.component';
import { RankComponent } from './rank/rank.component';
import { MonthReportComponent } from './month-report/month-report.component';
import { SysSettingComponent } from './sys-setting/sys-setting.component';
import { EduComponent } from './manage/edu/edu.component';
import { CertComponent } from './manage/cert/cert.component';
import { SkillComponent } from './manage/skill/skill.component';
import { PositionComponent } from './manage/position/position.component';
import { DepartmentComponent } from './manage/department/department.component';
import { ClassComponent } from './manage/class/class.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'master/desktop', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  // { path: 'master', component: MasterPageComponent },
]
const masterRoutes: Routes = [
  {
    path: 'master', component: MasterPageComponent, children: [
      { path: 'desktop', component: DesktopComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'growth', component: GrowthComponent },
      { path: 'rank', component: RankComponent },
      { path: 'report', component: MonthReportComponent },
      { path: 'setting', component: SysSettingComponent },
      { path: 'manage/edu', component: EduComponent }, 
      { path: 'manage/cert', component: CertComponent }, 
      { path: 'manage/skill', component: SkillComponent }, 
      { path: 'manage/position', component: PositionComponent }, 
      { path: 'manage/department', component: DepartmentComponent }, 
      { path: 'manage/class', component: ClassComponent }, 
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MasterPageComponent,
    DesktopComponent,
    EmployeeComponent,
    GrowthComponent,
    RankComponent,
    MonthReportComponent,
    SysSettingComponent,
    EduComponent,
    CertComponent,
    SkillComponent,
    PositionComponent,
    DepartmentComponent,
    ClassComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyDatePickerModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(masterRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
