import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PersistenceService } from 'angular-persistence';
import { Router } from '@angular/router';
import { ConfigService } from '../shared';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', Validators.compose(
      [Validators.email, Validators.required])],
    birthdate: [],
  });
  updatePasswordForm = this.fb.group({
    id: [0],
    password: ['', Validators.required],
    confirmPasword: ['', Validators.required]
  }, {
    validator: this.ConfirmedValidator('password', 'confirmPasword')
  }

  );
  exampleHeader;
  selectedFile: File;
  UploadedFile;
  usersId;
  param;
  isVisible: boolean = true;
  constructor(private configService: ConfigService, private fb: FormBuilder, private router: Router, private http: HttpClient, private persistenceService: PersistenceService) { }
  ngOnInit(): void {
    if (this.persistenceService.get('idFromTable')) {

      this.usersId = this.persistenceService.get('idFromTable')
      this.persistenceService.remove('idFromTable')
    }
    else {
      this.usersId = localStorage.getItem('usersLoginId');
    }
    this.updateOperation();
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  // ---------------------------------------------------------------------------------
  get f() {
    return this.profileForm.controls;
  }
  get primaryEmail() {
    return this.profileForm.get('email');
  }
  onSubmit() {
    var id = this.profileForm.controls.id.value;
    if (this.profileForm.valid) {
      this.configService.updateUsers(this.profileForm.value, id)
        .subscribe(data => {
          alert("data updated successfully");
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

  updateOperation() {
    this.configService.getUsersById(this.usersId).subscribe(data => {
      this.profileForm.patchValue({
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        birthdate: data[0].birthdate,
      });
    });

  }


  // --------------------password update--------------------
  get updatePasswordFormcontrol() {
    return this.updatePasswordForm.controls;
  }
  onPasswordUpdate() {
    var id = this.usersId;
    if (this.updatePasswordForm.valid) {
      if (id > 0) {
        this.configService.updateUsersPassword(this.updatePasswordForm.value, id)
          .subscribe(data => {
            alert("password updated successfully");
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
  }
  // -------------------------------------------profile pic update----------------
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
  onPhotoUpdate() {
    if (this.UploadedFile) {
      this.param = {
        "profile_pic": this.UploadedFile.filename
      }
      var id = this.usersId;
      if (id > 0) {

        this.configService.updateUsersProfile(this.param, id)
          .subscribe(data => {
            alert("profile photo updated successfully");
            this.UploadedFile = "";
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
    else {
      alert("Please Select Profile Photo First")
    }

  }
}
