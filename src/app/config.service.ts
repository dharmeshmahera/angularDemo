import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './users.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pages } from './pages.model';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  myGlobalVar;
  apiUrl = "http://localhost:3000/";
  myfilename = new BehaviorSubject<any>("download.jpg-1591187289789.jpg");
  myFileName = this.myfilename.asObservable();
  list;
  list$: BehaviorSubject<Users> = new BehaviorSubject(this.list);
  data;
  pagesData: Pages[];
  elementbyId: Pages;
  dataelement: any;
  editFileName(newFileName) {
    this.myfilename.next(newFileName);
  }
  defaultaddress = new BehaviorSubject<any>("");
  defaultAddress = this.defaultaddress.asObservable();
  changeAddress(newAddress) {
    this.defaultaddress.next(newAddress);
  }
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get<Users[]>(this.apiUrl + "data");
  }
  getUsersById(id: number) {
    return this.http.get<Users[]>(this.apiUrl + "data/" + id);
  }
  deleteUsers(id: number) {
    return this.http.delete<Users[]>(this.apiUrl + "data/" + id);
  }
  createUsers(users: Users): Observable<Users> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Users>(this.apiUrl + "signup/",
      users, httpOptions);
  }
  updateUsers(users: Users, id: number) {
    return this.http.put(this.apiUrl + "update/" + id, users);
  }
  updateUsersPassword(users: Users, id: number) {
    return this.http.put(this.apiUrl + "users/changePassword/" + id, users);
  }
  updateUsersProfile(users: Users, id: number) {
    return this.http.put(this.apiUrl + "users/chaneProfilePic/" + id, users);
  }
  createLogin(users: Users): Observable<Users> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Users>(this.apiUrl + "login/",
      users, httpOptions);
  }
  update(index, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    this.list$.next(this.list);
  }
  getControl(index, fieldName) {
  }
}
