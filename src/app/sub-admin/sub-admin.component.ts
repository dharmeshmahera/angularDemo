import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../shared';
import { Router } from '@angular/router';
import { PersistenceService } from 'angular-persistence';
import { SettingService } from '../setting/setting.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.css']
})
export class SubAdminComponent implements OnInit {
  math = Math
  total_user;
  usersId;
  faqlength: number;
  loginUserName: string;
  loginUserProfilePic: any;
  constructor(private http: HttpClient, private configService: ConfigService, private router: Router,private persistenceService:PersistenceService,private settingService:SettingService) { }

  ngOnInit(): void {
      $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
      });
    this.getfaqs();
    this.usersId = localStorage.getItem('usersLoginId');
    this.getUsersById();
  }
  logOut() {
    this.persistenceService.remove('token')
    this.router.navigate(['']);
  }
  getfaqs() {
    this.settingService.getFaq().subscribe((result) => {
      this.faqlength = result.length;
    })
  }

getUsersById()
  {
    this.configService.getUsersById(this.usersId).subscribe(data => {
      if(data.length>0)
      {
        this.loginUserName=data[0].name;
        this.loginUserProfilePic=data[0].profile_pic;
      }
      else
      {
        alert("User Not Found")
      }
    
    });
  }

}
