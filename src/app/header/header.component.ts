import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../shared';
import { SettingService } from '../setting/setting.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  companyDetail;
  companyAddress: any;
  companyPhone: any;
  companyEmail: any;
  companyLogo: any;
  type: string;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  pageContent: any;
  iconData: any;
  pagedata: any;

  constructor(private route: ActivatedRoute, private configService: ConfigService, private settingService: SettingService, private router: Router) { }

  ngOnInit(): void {
    this.getPages();
    this.getcompanyDetail();
    this.getIcondetail();
  }
  getIcondetail() {
    this.settingService.getIconDetail().subscribe((result) => {
      this.iconData = result;
    });
  }
  getcompanyDetail() {
    this.settingService.getCompanyDetail().subscribe((result) => {
      this.companyDetail = result;
      if (result.length > 0) {
        this.companyAddress = this.companyDetail[0].address;
        this.companyPhone = this.companyDetail[0].phone;
        this.companyEmail = this.companyDetail[0].email;
        this.companyLogo = this.companyDetail[0].logo;
      }
      else
      {
        alert("Result Not Found")
      }
    });
  }
  getPages() {
    this.settingService.getpages().subscribe(data => {
      this.pagedata = data;
    });
  }
}

