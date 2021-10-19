import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfigService, Users } from '../shared';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PersistenceService } from 'angular-persistence';
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  profileForm = this.fb.group({
    id: [0],
    role: ['user'],
    name: ['', Validators.required],
    email: ['', Validators.compose(
      [Validators.email, Validators.required])],
    password: ['', Validators.required],
    birthdate: [],
    profile_pic: [''],
  });
  exampleHeader: any
  selectedFile: File = null;
  UploadedFile: any;
  usersId: any;
  isVisible: boolean = true;
  constructor(private configService: ConfigService, private fb: FormBuilder, private router: Router, private http: HttpClient, private persistenceService: PersistenceService) { }
  ngOnInit(): void {
  }
  get f() {
    return this.profileForm.controls;
  }
  get primaryEmail() {
    return this.profileForm.get('email');
  }
  onSubmit() {
    if (this.UploadedFile) {
      this.profileForm.controls.profile_pic.setValue(this.UploadedFile.filename);
      this.configService.createUsers(this.profileForm.value)
        .subscribe(data => {
          alert("data inserted successfully");
          this.UploadedFile = "";
          this.profileForm.patchValue({ "id": 0, "name": "", "email": "", "password": "", "birthdate": "", "profile_pic": "" });
        },
          (error) => {
            if (error.error.text) {
              alert(error.error.text);
            }
            else {
              alert("somethong went wrong");
            }
          });

    } else {
      alert("Please Select Profile Pic")
    }

  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('files', this.selectedFile, this.selectedFile.name)
      this.http.post("http://localhost:3000/upload", fd)

        .subscribe(res => {
          this.UploadedFile = res;
        })
    }
    else {
      alert("Please Select File")
    }

  }
}
