import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting/setting.service';
import { ConfigService } from '../shared';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  math = Math
  faqlength: number;
  total_user: number;

  constructor(private settingService: SettingService, private configService: ConfigService) { }

  ngOnInit(): void {

    this.getfaqs();
    this.getUsers();
  }
  getUsers() {
    this.configService.getUsers().subscribe((result) => {
      this.total_user = result.length;
    })
  }
  getfaqs() {
    this.settingService.getFaq().subscribe((result) => {
      this.faqlength = result.length;
    })
  }
}
