import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { PersistenceModule } from 'angular-persistence';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdminComponent } from './admin.component';

import { UsersTableComponent } from '../users-table/users-table.component';
import { SettingComponent } from '../setting/setting.component';

import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { SubAdminComponent } from '../sub-admin/sub-admin.component';
import { SubadminDashboardComponent } from '../subadmin-dashboard/subadmin-dashboard.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersTableComponent,
    SettingComponent,
    AdminDashboardComponent,
    SubadminDashboardComponent,
    SubAdminComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,
    PersistenceModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    FontAwesomeModule,
    AngularEditorModule,
    MatExpansionModule,
    RouterModule
  ]
})
export class AdminModule { }