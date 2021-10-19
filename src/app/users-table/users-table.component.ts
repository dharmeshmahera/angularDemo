import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService, Users } from './../shared/index';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormArray, } from '@angular/forms';
import { Router } from '@angular/router';
import { PersistenceService } from 'angular-persistence';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  dataSource;
  users;
  tableColumns: string[] = ['id','role','name','email', 'password', 'birthdate', 'profilePic', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  controls: FormArray;
  userId: any;

  constructor(private configService: ConfigService, private router: Router, private persistenceService: PersistenceService) { }
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.configService.getUsers().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as unknown as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteUsers(id) {
    var confirmDelete = confirm("Are you want to delete?");
    if (confirmDelete) {
      this.configService.deleteUsers(id).subscribe((data) => {
        alert("data deleted successfully");
        this.getUsers()
      }, (error) => {
        alert(error);
      });
    }

  }
  updateProfile(usersId)
 {
  this.persistenceService.set('idFromTable', usersId);
  this.router.navigate(['admin/editProfile']);
 }
}
