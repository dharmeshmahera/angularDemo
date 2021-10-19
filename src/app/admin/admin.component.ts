import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { PersistenceService } from 'angular-persistence';
import { SettingService } from '../setting/setting.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  total_user;
  usersId;
  faqlength: number;
  loginUserName: string;
  loginUserProfilePic: any;
  constructor(private http: HttpClient, private configService: ConfigService, private router: Router, private persistenceService: PersistenceService, private settingService: SettingService) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.usersId = localStorage.getItem('usersLoginId');
    this.getUsersById();
  }
  logOut() {
    this.persistenceService.remove('token')
    this.router.navigate(['']);
  }
  getUsersById() {
    this.configService.getUsersById(this.usersId).subscribe(data => {
      if(data.length>0)
      {
        this.loginUserName = data[0].name;
      this.loginUserProfilePic = data[0].profile_pic;
      }
      else
      {
        alert("User Not Found")
      }
      
    });
  }
}


