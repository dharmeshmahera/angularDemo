import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting/setting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  companyAddress: any;
  companyPhone: any;
  companyEmail: any;
  companyLogo;
  iconData;
  pagedata;
  pageContent: any;
  companyDetail;

  constructor( private settingService: SettingService) { }

  ngOnInit() {
    this.getcompanyDetail();
    this.getPages()
    this.getIcondetail()
  }
  pagesData(page) {
    this.pageContent = page.content;
  }
  getcompanyDetail() {
    this.settingService.getCompanyDetail().subscribe((result) => {
      this.companyDetail = result;
      this.companyAddress = this.companyDetail[0].address;
      this.companyPhone = this.companyDetail[0].phone;
      this.companyEmail = this.companyDetail[0].email;
      this.companyLogo = this.companyDetail[0].logo;
    });
  }
  getIcondetail() {
    this.settingService.getIconDetail().subscribe((result) => {
      this.iconData = result;
    });
  }
  getPages() {
    this.settingService.getpages().subscribe(data => {
      this.pagedata = data;
    });
  }
}
