import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting/setting.service';
import { ConfigService } from '../shared';

@Component({
  selector: 'app-subadmin-dashboard',
  templateUrl: './subadmin-dashboard.component.html',
  styleUrls: ['./subadmin-dashboard.component.css']
})
export class SubadminDashboardComponent implements OnInit {

  math = Math
  faqlength: number;
  total_user: number;

  constructor(private settingService:SettingService,private configService:ConfigService) { }

  ngOnInit(): void {
    this.configService.getUsers().subscribe((result) => {
      this.total_user = result.length;
    })
    this.getfaqs();
  }
  getfaqs() {
    this.settingService.getFaq().subscribe((result) => {
      this.faqlength = result.length;
    })
  }
}
