import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingService } from '../setting/setting.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  id: string;
  pagedata;
  content;
  pageContent: any;

  constructor(private route: ActivatedRoute, private settingService: SettingService) { }

  ngOnInit(): void {
    this.getPages()
  }
  getPages() {
    this.settingService.getpages().subscribe(data => {
      this.pagedata = data;
    });
  }
  pagesData(page) {
    this.pageContent = page.content;
  }
}
