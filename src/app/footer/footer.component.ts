import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting/setting.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  companyDetail: any;
  companyAddress: any;
  companyPhone: any;
  companyEmail: any;
  companyLogo: any;
  iconData: any;

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.getcompanyDetail();
    this.getIcondetail()
  }
  getcompanyDetail() {
    this.settingService.getCompanyDetail().subscribe((result) => {
      this.companyDetail = result;
      if(result.length>0)
      {
        this.companyAddress = this.companyDetail[0].address;
        this.companyPhone = this.companyDetail[0].phone;
        this.companyEmail = this.companyDetail[0].email;
        this.companyLogo = this.companyDetail[0].logo;
      }
      else
      {
        alert("No Company Data Found")
      }
    });
  }
  getIcondetail() {
    this.settingService.getIconDetail().subscribe((result) => {
      this.iconData = result;
    });
  }
}
