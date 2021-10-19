import { Component, OnInit} from '@angular/core';
import { SettingService } from '../setting/setting.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  companyAddress: any;
  companyDetail;
  companyEmail: any;
  companyPhone: any;
  companyLogo: any;
 constructor( private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getCompanyDetail().subscribe((result) => {
      if(result.length>0)
      {
        this.companyDetail = result;
        this.companyAddress = this.companyDetail[0].address;
        this.companyPhone = this.companyDetail[0].phone;
        this.companyEmail = this.companyDetail[0].email;
        this.companyLogo = this.companyDetail[0].logo;
      }
      else{
        alert("No result found")
      }
    });
  }
}

