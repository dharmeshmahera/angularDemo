import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService, AuthGuardService } from './../shared/index';
import { PersistenceService } from 'angular-persistence';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    role: ['user'],
    id: [0],
    email: ['', Validators.compose(
      [Validators.email, Validators.required])],
    password: ['', Validators.required],
  });
  email: any;
  password: any;
  loginData: any;
  token: any;
  constructor(private fb: FormBuilder, private configService: ConfigService, private route: ActivatedRoute,
    private router: Router, private authguardservice: AuthGuardService, private persistenceService: PersistenceService) { }

  ngOnInit(): void {
  }
  get f() {
    return this.loginForm.controls;
  }
  get primaryEmail() {
    return this.loginForm.get('email');
  }
  onLogin() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.configService.createLogin(this.loginForm.value)
      .subscribe(data => {
        this.loginData = data;
        this.token = this.loginData.token;
        this.persistenceService.set('id', this.loginData.id);
        localStorage.setItem('usersLoginId', this.loginData.id);
        this.persistenceService.set('token', this.loginData.token);

        if (this.authguardservice.canActivate() == true && this.loginData.role == "admin") {
          this.router.navigate(['admin/dashboard'])
        }
        else if (this.authguardservice.canActivate() == true && this.loginData.role == "sub_admin") {
          this.router.navigate(['subadmin/dashboard'])
        }
        else if (this.authguardservice.canActivate() == true) {
          this.router.navigate(['defaultUsers']);
        }
        else {
          alert("Token not generated")
          this.router.navigate(['login']);
        }
      },
        (error) => {
          if (error.error.text) {
            alert(error.error.text);
          }
          else {
            alert("somethong went wrong");
          }
        });
  }
}
