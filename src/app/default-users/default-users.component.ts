import { Component, OnInit } from '@angular/core';
import { PersistenceService } from 'angular-persistence';
import { Router } from '@angular/router';
import { SettingService } from '../setting/setting.service';

@Component({
  selector: 'app-default-users',
  templateUrl: './default-users.component.html',
  styleUrls: ['./default-users.component.css']
})
export class DefaultUsersComponent implements OnInit {
  companyDetail;
  companyAddress: any;
  companyPhone: any;
  companyEmail: any;
  companyLogo: any;
  iconData;
  pagedata;
  pageContent: any;

  constructor(private persistenceService: PersistenceService, private router: Router, private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getCompanyDetail().subscribe((result) => {
      this.companyDetail = result;
      this.companyAddress = this.companyDetail[0].address;
      this.companyPhone = this.companyDetail[0].phone;
      this.companyEmail = this.companyDetail[0].email;
      this.companyLogo = this.companyDetail[0].logo;
    });
    this.settingService.getIconDetail().subscribe((result) => {
      this.iconData = result;
    });
    this.settingService.getpages().subscribe(data => {
      this.pagedata = data;
    });
  }
  logOut() {
    this.persistenceService.remove('token')
    this.router.navigate(['']);
  }
  pagesData(page) {
    this.pageContent = page.content;
  }
}
