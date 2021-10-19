import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../shared';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SettingService } from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  iconForm = this.fb.group({
    iconid: [0],
    icon: [''],
    link: ['', Validators.required],
  });
  faqForm = this.fb.group({
    faqid: [0],
    question: ['', Validators.required],
    answer: ['', Validators.required],
  });
  pagesForm = this.fb.group({
    pageid: [0],
    title: ['', Validators.required],
    content: ['', Validators.required]
  });
  companyDetailForm = this.fb.group({
    address: ['', Validators.required],
    email: ['', Validators.compose(
      [Validators.email, Validators.required])],
    phone: ['', Validators.required]
  });
  dataSourceIcon;
  PagesColumns: string[] = ['pageid', 'title', 'content', 'action'];
  tableColumnsIcon: string[] = ['iconid', 'icon', 'link', 'action'];
  FaqColumns: string[] = ['faqid', 'question', 'answer', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  selectedFile;
  UploadedFile;
  dataSourceFaq;
  faqData;
  dataSourcePages: any;
  pageIdToUpdate: any;
  UploadedLogoFile;
  logoFileName;

  constructor(private settingService: SettingService, private configService: ConfigService, private fb: FormBuilder, private http: HttpClient) { }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  ngOnInit(): void {
    this.getIconDetail();
    this.getFaqs();
    this.getPages()
    this.companyDetailUpdate()
  }
  getIconDetail() {
    this.settingService.getIconDetail().subscribe((result) => {
      this.dataSourceIcon = new MatTableDataSource(result);
    })
  }
  applyFilterIcon(event: Event) {
    const filterValue = (event.target as unknown as HTMLInputElement).value;
    this.dataSourceIcon.filter = filterValue.trim().toLowerCase();
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
  get iconControls() {
    return this.iconForm.controls;
  }
  onSubmit() {
    if (this.UploadedFile) {
      this.iconForm.controls.icon.setValue(this.UploadedFile.filename);
      this.settingService.addIcon(this.iconForm.value)
        .subscribe(data => {
          var data = data;
          console.log(data);
          alert("Icon inserted successfully");
          this.UploadedFile = "";
          this.iconForm.patchValue({ "iconid": 0, "icon": "", "link": "" });
          this.getIconDetail();
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
    else {
      alert("Please Select File First");
    }

  }
  deleteIcon(id) {
    var confirmDelete = confirm("Are you want to delete?");
    if (confirmDelete) {
      this.settingService.deleteIconById(id).subscribe((data) => {
        alert("Icon deleted successfully");
        this.getIconDetail();
      }, (error) => {
        alert(error);
      });
    }

  }
  // ------------------------------------------------------------------------------------
  getFaqs() {
    this.settingService.getFaq().subscribe((result) => {
      this.dataSourceFaq = new MatTableDataSource(result);
      this.dataSourceFaq.paginator = this.paginator;
      this.dataSourceFaq.sort = this.sort;

    })
  }
  applyFilterFaq(event: Event) {
    const filterValue = (event.target as unknown as HTMLInputElement).value;
    this.dataSourceFaq.filter = filterValue.trim().toLowerCase();
  }
  deleteFaq(id) {
    var confirmDelete = confirm("Are you want to delete?");
    if (confirmDelete) {
      this.settingService.deleteFaqById(id).subscribe((data) => {
        alert("FAQ deleted successfully");
        this.getFaqs();
      }, (error) => {
        alert(error);
      });
    }
  }
  get faqControls() {
    return this.faqForm.controls;
  }
  onfaqFormSubmit() {
    var id = this.faqForm.controls.faqid.value;
    if (this.faqForm.valid) {
      if (id > 0) {
        this.settingService.updateFaq(this.faqForm.value, id)
          .subscribe(data => {
            alert("FAQ updated successfully");
            this.getFaqs();
            this.faqForm.patchValue({ "faqid": 0, "question": "", "answer": "" });
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
      else {
        this.settingService.addFaq(this.faqForm.value)
          .subscribe(data => {
            this.faqData = data
            alert("FAQ inserted successfully");
            this.faqForm.patchValue({ "faqid": 0, "question": "", "answer": "" });
            this.getFaqs();
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
  updatefaq(id) {
    this.settingService.getFaqById(id).subscribe(data => {
      this.faqForm.patchValue({
        faqid: data[0].faqid,
        question: data[0].question,
        answer: data[0].answer,
      });
    });
  }
  // --------------------------------------------------------------------------------------
  getPages() {
    this.settingService.getpages().subscribe((result) => {
      this.dataSourcePages = new MatTableDataSource(result);
    })
  }
  applyFilterPages(event: Event) {
    const filterValue = (event.target as unknown as HTMLInputElement).value;
    this.dataSourcePages.filter = filterValue.trim().toLowerCase();
  }
  deletePages(id) {
    var confirmDelete = confirm("Are you want to delete?");
    if (confirmDelete) {
      this.settingService.deletePages(id).subscribe((data) => {
        alert("Page deleted successfully");
        this.getPages()
      }, (error) => {
        alert(error);
      });
    }
  }
  updatepages(pagesId) {
    this.settingService.getPagesById(pagesId).subscribe(data => {
      this.pagesForm.patchValue({
        pageid: data[0].pageid,
        title: data[0].title,
        content: data[0].content,
      });
    });
  }
  get pagesControls() {
    return this.pagesForm.controls;
  }
  onPagesFormSubmit() {
    this.pageIdToUpdate = this.pagesForm.controls.pageid.value;
    if (this.pagesForm.valid) {
      if (this.pageIdToUpdate > 0) {
        this.settingService.updatePages(this.pagesForm.value, this.pageIdToUpdate)
          .subscribe(data => {
            alert("Page updated successfully");
            this.getPages();
            this.pagesForm.patchValue({ "pageid": 0, "title": "", "content": "" });
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
      else {
        this.settingService.createPages(this.pagesForm.value)
          .subscribe(data => {
            alert("Page inserted successfully");
            this.pagesForm.patchValue({ "pageid": 0, "title": "", "content": "" });
            this.getPages();
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
  // -------------------------------------------------------------------------------
  onLogoUpdateFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const fd = new FormData();
    if (this.selectedFile) {
      fd.append('files', this.selectedFile, this.selectedFile.name)
      this.http.post("http://localhost:3000/upload", fd)
        .subscribe(res => {
          this.UploadedLogoFile = res;
        })
    }
    else {
      alert("Please Select File")
    }

  }
  logoUpdate() {
    if (this.UploadedLogoFile) {
      var paramLogoUpdate = {
        "logo": this.UploadedLogoFile.filename
      }
      this.settingService.updateCompanyLogo(paramLogoUpdate).subscribe(data => {
        alert("logo updated successfully");
        this.UploadedLogoFile = "";
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
    else {
      alert("Please Select Logo First")
    }
  }

  // -----------------------------------------------------------------------------------------------------
  get companyControls() {
    return this.companyDetailForm.controls;
  }
  get companyEmail() {
    return this.companyDetailForm.get('email');
  }
  companyDetailUpdate() {
    this.settingService.getCompanyDetailById(1).subscribe(data => {
      this.companyDetailForm.patchValue({
        address: data[0].address,
        email: data[0].email,
        phone: data[0].phone,
      });;
    });
  }
  onCompanyDetailFormSubmit() {
    this.settingService.updateCompanyDetail(this.companyDetailForm.value).subscribe(data1 => {
      alert("Company Detail updated succesfull");
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
