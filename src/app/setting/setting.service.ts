import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Icons } from '../icons.model';
import { Observable } from 'rxjs';
import { Faq } from '../faq.model';
import { Pages } from '../pages.model';
import { Company } from '../company.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  apiUrl="http://localhost:3000/";
  constructor(private http:HttpClient) { }
  getIconDetail()
  {
    return this.http.get<Icons[]>(this.apiUrl+"icon");
  }
  addIcon(icons: Icons): Observable<Icons> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Icons>(this.apiUrl+"icon",  
      icons, httpOptions); 
  }
  deleteIconById(id: number) {  
    return this.http.delete<Icons[]>(this.apiUrl +"icon/"+id); 
  }
  // ---------------------------------------------------------------------
// ----------------------FAQ----------------------------------------------
  getFaq()
  {
    return this.http.get<Faq[]>(this.apiUrl+"faq");
  }
  deleteFaqById(id: number) {  
    return this.http.delete<Faq[]>(this.apiUrl +"faq/"+id); 
  }
  addFaq(faqs: Faq): Observable<Faq> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Faq>(this.apiUrl+"faq",  
    faqs, httpOptions); 
  }
  
  getFaqById(id:number)
  {
    return this.http.get<Faq[]>(this.apiUrl+"faq/"+id);
  }
  updateFaq(faqs: Faq,id:number){
    return this.http.put(this.apiUrl +"faq/"+ id,faqs);
  }


  // ------------------------------------------pages-----------------------------------
  getpages()
  {
    return this.http.get<Pages[]>(this.apiUrl+"pages");
  }
  createPages(pages: Pages): Observable<Pages> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Pages>(this.apiUrl+"pages/",  
      pages, httpOptions); 
  }
  updatePages(pages: Pages,id:number){
    return this.http.put(this.apiUrl +"pages/"+ id,pages);
  }
  deletePages(id: number) {  
    return this.http.delete<Pages[]>(this.apiUrl +"pages/"+id); 
  } 
  getPagesById(id:number)
  {
    return this.http.get<Pages[]>(this.apiUrl+"pages/"+id);
  }

  // -------------------------------------company logo------------------------

  updateCompanyLogo(companyLogo){
    return this.http.put(this.apiUrl +"company/logo/"+ 1,companyLogo);
  }
// ----------------------company detail--------------------------

getCompanyDetail()
{
  return this.http.get<Company[]>(this.apiUrl+"company/detail");
}
getCompanyDetailById(id:number)
{
  return this.http.get<Company[]>(this.apiUrl+"company/"+id);
}
updateCompanyDetail(company){
  return this.http.put(this.apiUrl +"company/"+ 1,company);
}
}
