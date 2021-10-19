import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SettingService } from '../setting/setting.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  viewProviders: [MatExpansionPanel]
})
export class FaqComponent implements OnInit {
  faqForm = this.fb.group({
    faqid: [0],
    question: ['', Validators.required],
    answer: ['', Validators.required],
  });
  dataSource: any;
  faqs;

  constructor(private settingService: SettingService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getfaqs();
  }

  getfaqs() {
    this.settingService.getFaq().subscribe((result) => {
      this.faqs = result;
    })
  }
}
