import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { CreateUsersComponent } from './create-users/create-users.component';
import { AdminComponent } from './admin/admin.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DefaultUsersComponent } from './default-users/default-users.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { SettingComponent } from './setting/setting.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SubadminDashboardComponent } from './subadmin-dashboard/subadmin-dashboard.component';
import { PagesComponent } from './pages/pages.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {
        path: ':type',
        component:PagesComponent
      }
    ]
  },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'usersTable',
        component: UsersTableComponent,
      },
      {
        path: 'setting',
        component: SettingComponent,
      },

      {
        path: 'editProfile',
        component: EditProfileComponent
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'subadmin',
    component: SubAdminComponent,
    children: [
      {
        path: 'setting',
        component: SettingComponent,
      },

      {
        path: 'dashboard',
        component: SubadminDashboardComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'createUsers',
    component: CreateUsersComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'defaultUsers',
    component: DefaultUsersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '/404' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
