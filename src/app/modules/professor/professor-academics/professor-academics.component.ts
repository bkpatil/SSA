import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'professor-academics',
  templateUrl: './professor-academics.component.html',
  styleUrls: ['./professor-academics.component.scss']
})
export class ProfessorAcademicsComponent implements OnInit {
  tile: any = {};
  selected: any;
  lists: any;
  subjects: any;
  selectedS: any;
  subject: any = {};
  chapterDetails: any;
  selectedC: any;
  showAdd: boolean = false;
  showAddSyllabus: boolean = false;
  showAddNotes: boolean = false;
  showAddNotifications: boolean = false;
  fields: any;
  newRecord: any = {};
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  button: any;
  years: any = [];
  searchFields: any;
  searchFields1; any;
  tempValue: any;
  url: any;
  professor: boolean;
  showSyllabus: true;
  showNotes: true;
  syllabus: any = {};
  notes: any;
  searchTemp: any;
  notifications: any;
  callNotificationsGrid: boolean = false;
  notesFields: any;
  callNotesGrid: boolean = false;
  tableHeight: any;
  subjectValues: any = [];
  showSubject: boolean = false;
  showTopics: boolean = false;
  topics: any = [];
  constructor(private http: HttpClient, private dataService: DataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [];
    this.newRecord = {};
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.searchFields = [
      {
        field: 'year',
        label: 'Year',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
        ],
        update: true
      },
      {
        field: 'course',
        label: 'Course',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.courses,
        update: true
      },
      {
        field: 'department',
        label: 'Department',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.departments,
        update: true
      },
      {
        field: 'semester',
        label: 'Semester',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: '1', id: '1' },
          { name: '2', id: '2' }
        ],
        update: true
      }, {
        field: 'subject',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.professorSubjects ? this.dataService.professorSubjects : this.dataService.subjects,
        update: true
      }
    ]
    this.searchFields1 = [
      {
        field: 'year',
        label: 'Year',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
        ],
        update: true
      },
      {
        field: 'course',
        label: 'Course',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.courses,
        update: true
      },
      {
        field: 'department',
        label: 'Department',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.departments,
        update: true
      },

      {
        field: 'semester',
        label: 'Semester',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: '1', id: '1' },
          { name: '2', id: '2' }
        ],
        update: true
      },
    ]

    this.subjects = ["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5", "Subject 6", "Subject 7", "Subject 8"];
    this.lists = ['1st Year - 1', '1st Year - 2', '2nd Year - 1', '2nd Year - 2', '3rd Year - 1', '3rd Year - 2', '4th Year - 1', '4th Year - 2'];
    this.selected = this.lists[0];
    this.selectedS = this.subjects[0];
    this.button = 'View Syllabus';
    this.subject.syllabus = {
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11", "Chapter 12", "Chapter 13", "Chapter 14"],
      "Chapter 1": { syllabus: "Details about chapter 1", lectureNotes: "Lecture Notes on chapter 1", notifications: 'chapter 1 notifications' },
      "Chapter 2": { syllabus: "Details about chapter 2", lectureNotes: "Lecture Notes on chapter 2", notifications: 'chapter 2 notifications' },
      "Chapter 3": { syllabus: "Details about chapter 3", lectureNotes: "Lecture Notes on chapter 3", notifications: 'chapter 3 notifications' },
      "Chapter 4": { syllabus: "Details about chapter 4", lectureNotes: "Lecture Notes on chapter 4", notifications: 'chapter 4 notifications' },
      "Chapter 5": { syllabus: "Details about chapter 5", lectureNotes: "Lecture Notes on chapter 5", notifications: 'chapter 5 notifications' },
      "Chapter 6": { syllabus: "Details about chapter 6", lectureNotes: "Lecture Notes on chapter 6", notifications: 'chapter 6 notifications' },
      "Chapter 7": { syllabus: "Details about chapter 7", lectureNotes: "Lecture Notes on chapter 7", notifications: 'chapter 7 notifications' },
      "Chapter 8": { syllabus: "Details about chapter 8", lectureNotes: "Lecture Notes on chapter 8", notifications: 'chapter 8 notifications' },
      "Chapter 9": { syllabus: "Details about chapter 9", lectureNotes: "Lecture Notes on chapter 9", notifications: 'chapter 9 notifications' },
      "Chapter 10": { syllabus: "Details about chapter 10", lectureNotes: "Lecture Notes on chapter 10", notifications: 'chapter 10 notifications' },
      "Chapter 11": { syllabus: "Details about chapter 11", lectureNotes: "Lecture Notes on chapter 11", notifications: 'chapter 11 notifications' },
      "Chapter 12": { syllabus: "Details about chapter 12", lectureNotes: "Lecture Notes on chapter 12", notifications: 'chapter 12 notifications' },
      "Chapter 13": { syllabus: "Details about chapter 13", lectureNotes: "Lecture Notes on chapter 13", notifications: 'chapter 13 notifications' },
      "Chapter 14": { syllabus: "Details about chapter 14", lectureNotes: "Lecture Notes on chapter 14", notifications: 'chapter 14 notifications' }
    };
    this.chapterDetails = this.subject.syllabus[this.subject.syllabus.chapters[0]];
  }

  ngAfterContentChecked() {
    //this.callGrid = false;
    this.getHeightWidth();
    let padding = 60,
      height = ($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop);
    this.tile.rowHeight = height + 'px';
    this.data.height = $('.nav-list')[0].offsetTop - $('.mat-tab-body-wrapper')[0].offsetTop - 280;
    if (this.callNotificationsGrid || this.callNotesGrid) {
      this.data.height = this.data.height + 200;
    }
    // this.callGrid = true;
  }

  public selectedList(list) {
    this.selected = list;
    this.selectedS = this.subjects[0];
  }
  public selectedSubject(subject) {
    this.selectedS = subject;
    this.selectedC = this.subject.syllabus.chapters[0];
    this.chapterDetails = this.subject.syllabus[this.subject.syllabus.chapters[0]];
  }
  public selectedChapter(chapter) {
    this.selectedC = chapter;
    this.chapterDetails = this.subject.syllabus[chapter];
  }
  valueChange() {
    if (this.newRecord.year && this.newRecord.semester && this.newRecord.semester && this.newRecord.department) {
      var objTemp = {
        "year": this.newRecord.year,
        "semester": this.newRecord.semester,
        "businessId": this.dataService.user.businessId,
        "course": this.newRecord.course,
        "department": this.newRecord.department
      };
      this.dataService.getData('student/viewSubjectsForStudent', objTemp).subscribe(results => {
        if (results.data) {
          this.subjectValues = results.data;
          this.showSubject = true;
        }
      });
    }
  }
  onSearch(student, flag?) {
    if (flag) {
      let temp = {
        "year": student.year || '',
        "semester": student.semester || '',
        "course": student.course || '',
        "department": student.department || '',
        "subject": student.subject,
        "businessId": this.dataService.user.businessId || ''
      }
      this.data.objTemp = temp;
      this.searchTemp = temp;
      this.getDataNotes('student/viewLectureNotesByStudent', temp);
    } else {
      let temp = {
        "year": student.year || '',
        "semester": student.semester || '',
        "course": student.course || '',
        "subject": student.subject || '',
        "department": student.department || '',
        "businessId": this.dataService.user.businessId || ''
      }
      this.data.objTemp = temp;
      this.searchTemp = temp;
      this.getData(temp);
    }
  }

  getData(temp) {
    let url = 'professor/viewSyllabus';
    this.data.url = url;

    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true,
        update: true
      },
      {
        field: 'businessId',
        label: 'Business Id',
        element: 'input',
        hide: true,
        editable: true
      },
      {
        field: 'year',
        label: 'Year',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
        ],
        update: true
      },
      {
        field: 'course',
        label: 'Course',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.courses,
        update: true
      },
      {
        field: 'department',
        label: 'Department',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.departments,
        update: true
      },
      {
        field: 'semester',
        label: 'Semester',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: '1', id: '1' },
          { name: '2', id: '2' }
        ],
        update: true
      },
      // {
      //   field: 'section',
      //   label: 'Section',
      //   element: 'dropdown',
      //   hide: false,
      //   editable: true,
      //   values: [
      //     { name: 'A', id: 'a' },
      //     { name: 'B', id: 'b' },
      //     { name: 'C', id: 'c' }
      //   ],
      //   update: true
      // },
      {
        field: 'subject',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.professorSubjects
      },
      {
        field: 'syllabus',
        label: 'Syllabus',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'isCompleted',
        label: 'Is Completed',
        element: 'dropdown',
        type: 'boolean',
        hide: false,
        editable: true,
        values: [
          { value: 'True', id: 1 },
          { value: 'False', id: 2 }
        ],
        update: true,
        boolean: true
      },
      {
        field: 'startDate',
        label: 'Start Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'endDate',
        label: 'End Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      }
    ];
    this.data.url = url;
    this.callGrid = false;
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
      //this.syllabus = this.data;
      let height = ($('.nav-list')[0].offsetTop - $('.dashboard-wrapper')[0].offsetTop),
        width = $('.sidenav-body')[0].offsetWidth;
      this.syllabus.width = width - 45;
      this.syllabus.height = height - 272;
      this.syllabus.showFilter = true;
      this.syllabus.showFooter = false;
      this.syllabus.deletable = true;
      this.syllabus.data = results.data;
      if (this.dataService.user.roleId != 6) {
        this.syllabus.updatable = true;
        this.fields.push({
          field: 'actions',
          label: 'Actions',
          element: '',
          hide: false,
          editable: true
        });
      }
      this.syllabus.deleteUrl = 'professor/deleteSyllabus';
      this.syllabus.editUrl = 'professor/updateSyllabus';
      this.syllabus.columns = ['id', 'year', 'course', 'department', 'semester', 'subject', 'syllabus', 'isCompleted', 'startDate', 'endDate'];
      this.newRecord = {};
      this.callGrid = true;

    });
  }
  getSubjects() {

  }

  notesValueChange() {
    this.showTopics = false;
    if (this.newRecord.year && this.newRecord.semester && this.newRecord.course && this.newRecord.department && this.newRecord.subject) {
      var objTemp =
      {
        "year": this.newRecord.year,
        "semester": this.newRecord.semester,
        "businessId": this.dataService.user.businessId,
        "course": this.newRecord.course,
        "department": this.newRecord.department,
        "subject": this.newRecord.subject
      };
      this.dataService.getData('professor/getTopics', objTemp).subscribe(results => {
        if (results.data) {
          this.topics = results.data;
          this.showTopics = true;
        }
      });
    }
  }

  public onFileInput($event, field) {
    const fileSelected: File = $event.target.files[0];
    const _formData = new FormData();
    _formData.append('file', fileSelected, fileSelected.name);
    var url = field.url || this.url || 'library/uploadfile';
    this.http.post('http://13.127.118.40:8080/collage-management/collage/' + url, _formData)
      .subscribe(
        (data: any) => {
          this.newRecord[field.field] = data.data;
          console.log(data);
        },
        error => {
          console.log(error);
          this.newRecord[field.field] = error.error.text;
        },
    );

  }

  getDataNotes(urlTemp?, data?) {
    this.callNotesGrid = false;
    let url = urlTemp ? urlTemp : 'professor/viewLectureNotes';
    this.getHeightWidth();
    this.data.url = url;
    this.notesFields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true,
        update: true
      },
      {
        field: 'professorId',
        label: 'Professor Id',
        element: 'input',
        hide: true,
        editable: true,
        update: true
      },

      {
        field: 'businessId',
        label: 'Business Id',
        element: 'input',
        hide: true,
        editable: true
      },
      {
        field: 'year',
        label: 'Year',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
        ],
        update: true
      },
      {
        field: 'course',
        label: 'Course',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.courses,
        update: true
      },
      {
        field: 'department',
        label: 'Department',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.departments,
        update: true
      },
      {
        field: 'semester',
        label: 'Semester',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: '1', id: '1' },
          { name: '2', id: '2' }
        ],
        update: true
      },
      {
        field: 'section',
        label: 'Section',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: 'A', id: 'a' },
          { name: 'B', id: 'b' },
          { name: 'C', id: 'c' }
        ],
        update: true
      },
      {
        field: 'subject',
        label: 'Subject',
        element: 'dropdown',
        hide: this.dataService.user.roleId != 6 ? false : true,
        editable: true,
        update: true,
        values: this.dataService.user.roleId != 6 ? this.dataService.professorSubjects : []
      },
      {
        field: 'documents',
        label: 'Documents',
        element: 'fileUpload',
        url: 'library/uploadfile',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'topic',
        label: 'Topic',
        element: 'input',
        hide: true,
        editable: true,
        update: true
      },
      {
        field: 'description',
        label: 'Description',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      }
    ];
    this.data.url = url;
    this.data.objTemp = data ? data : { "professorId": this.dataService.user.id };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      this.notes = this.data;
      if (!results || results.code === -1) {
        this.notes.data = [];
      } else
        this.notes.data = this.data;
      if (this.dataService.user.roleId == 6)
        this.notes.data = results.data;
      else
        this.notes.data = results.data;

      if (results.code === -1)
        this.notes.data = [];
      this.notes.deleteMethod = false;
      if (this.dataService.user.roleId != 6) {
        this.notes.columns = ['course', 'department', 'description', 'documents', 'id', 'section', 'semester', 'subject', 'topic', 'year'];
        this.notes.updatable = true;
        this.notesFields.push({
          field: 'actions',
          label: 'Actions',
          element: '',
          hide: false,
          editable: true
        });
      }
      this.notes.deleteUrl = 'professor/deleteLectureNotes';
      this.notes.editUrl = 'professor/updateLectureNotes';
      this.callNotesGrid = true;
      this.newRecord = {};
    });
  }
  getDataNotifications() {
    this.callNotificationsGrid = false;
    let url = 'professor/getAllNotifications',
      temp: any = { "businessId": this.dataService.user.businessId };
    this.getHeightWidth();
    this.data.url = url;
    if (this.dataService.user.selectedRole == 'Student') {
      url = 'student/viewNotificationsForStudent';
      temp = { userName: this.dataService.user.userName };
    }
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
      this.data.height = this.data.height + 200;
      this.data.maxHeight = this.data.maxHeight + 200;
      this.notifications = this.data;
      this.notifications.columns = ['id', 'department', 'course', 'semester', 'year', 'subject', 'chapter', 'notification'];
      this.notifications.fields = [
        {
          field: 'id',
          label: 'Id',
          element: 'input',
          hide: true,
          editable: true,
          remove: true,
          update: true
        },
        {
          field: 'businessId',
          label: 'Business Id',
          element: 'input',
          hide: true,
          editable: true
        },
        {
          field: 'year',
          label: 'Year',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: [
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" },
          ],
          update: true
        },
        {
          field: 'course',
          label: 'Course',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: this.dataService.courses,
          update: true
        },
        {
          field: 'department',
          label: 'Department',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: this.dataService.departments,
          update: true
        },
        {
          field: 'semester',
          label: 'Semester',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: [
            { name: '1', id: '1' },
            { name: '2', id: '2' }
          ],
          update: true
        },
        {
          field: 'subject',
          label: 'Subject',
          element: 'dropdown',
          hide: false,
          editable: true,
          update: true,
          values: this.dataService.professorSubjects
        },
        {
          field: 'chapter',
          label: 'Chapter',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'notification',
          label: 'Notification',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        }
      ];

      this.notifications.data = results.data;
      if (this.dataService.user.roleId != 6) {
        this.notifications.updatable = true;
        this.notifications.fields.push({
          field: 'actions',
          label: 'Actions',
          element: '',
          hide: false,
          editable: true
        });
      }
      this.notifications.deleteMethod = true;
      this.notifications.deleteUrl = 'professor/deleteNotifications/';
      this.notifications.editUrl = 'professor/editNotifications';
      this.callNotificationsGrid = true;
      this.newRecord = {};
    });
  }
  onDelete(flag) {
    this.snackBar.open('Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    this.callGrid = false;
    this.notes = [];
    this.notifications = [];
    this.syllabus = [];
    this.getDataNotes();
    this.getData(this.searchTemp);
    this.getDataNotifications();
  }
  addNotification() {
    this.showAdd = true;
    this.fields = [
      {
        field: 'Chapter',
        label: 'Select Chapter',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.subject.syllabus.chapters
      },
      {
        field: 'Notification',
        label: 'Notification',
        element: 'input',
        hide: false,
        editable: true
      }
    ];
    this.newRecord = {};
  }
  addSyllabus() {
    this.showAddSyllabus = true;
    let url = 'professor/viewSyllabus';
    this.data.url = url;
    this.data.deleteUrl = 'professor/deleteSyllabus';
    this.data.editUrl = 'professor/updateSyllabus';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true
      },
      {
        field: 'year',
        label: 'Year',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
        ],
        update: true
      },
      {
        field: 'course',
        label: 'Course',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.courses,
        update: true
      },
      {
        field: 'department',
        label: 'Department',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.departments,
        update: true
      },
      {
        field: 'semester',
        label: 'Semester',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: '1', id: '1' },
          { name: '2', id: '2' }
        ],
        update: true
      },
      {
        field: 'section',
        label: 'Section',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: 'A', id: 'a' },
          { name: 'B', id: 'b' },
          { name: 'C', id: 'c' }
        ],
        update: true
      },
      {
        field: 'subject',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.professorSubjects
      },
      {
        field: 'syllabus',
        label: 'Syllabus',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'isCompleted',
        label: 'Is Completed',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { value: 'True', id: 1 },
          { value: 'False', id: 0 }
        ],
        update: true,
        boolean: true
      },
      {
        field: 'startDate',
        label: 'Start Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'endDate',
        label: 'End Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      }
    ];
    this.newRecord = {};
    this.callGrid = true;
  }
  addNotes() {
    this.showAddNotes = true;
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true,
      },
      {
        field: 'professorId',
        label: 'Professor Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true,
        update: true
      },

      {
        field: 'businessId',
        label: 'Business Id',
        element: 'input',
        hide: true,
        editable: true
      },
      {
        field: 'year',
        label: 'Year',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
        ],
        update: true
      },
      {
        field: 'course',
        label: 'Course',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.courses,
        update: true
      },
      {
        field: 'department',
        label: 'Department',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.departments,
        update: true
      },
      {
        field: 'semester',
        label: 'Semester',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: '1', id: '1' },
          { name: '2', id: '2' }
        ],
        update: true
      },
      {
        field: 'section',
        label: 'Section',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: 'A', id: 'a' },
          { name: 'B', id: 'b' },
          { name: 'C', id: 'c' }
        ],
        update: true
      },
      {
        field: 'subject',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.professorSubjects
      },
      {
        field: 'documents',
        label: 'Documents',
        element: 'fileUpload',
        url: 'library/uploadfile',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'topic',
        label: 'Topic',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'description',
        label: 'Description',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ];
    this.newRecord = {};
  }
  addNotifications() {
    this.showAddNotifications = true;
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true,
      },
      {
        field: 'businessId',
        label: 'Business Id',
        element: 'input',
        hide: true,
        editable: true
      },
      {
        field: 'year',
        label: 'Year',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { id: "1" },
          { id: "2" },
          { id: "3" },
          { id: "4" },
        ],
        update: true
      },
      {
        field: 'course',
        label: 'Course',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.courses,
        update: true
      },
      {
        field: 'department',
        label: 'Department',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.departments,
        update: true
      },
      {
        field: 'semester',
        label: 'Semester',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: '1', id: '1' },
          { name: '2', id: '2' }
        ],
        update: true
      },
      {
        field: 'subject',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.professorSubjects
      },
      {
        field: 'chapter',
        label: 'Chapter',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'notification',
        label: 'Notification',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ];
    this.newRecord = {};
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.dashboard-wrapper')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 272;
    this.tableHeight = height - 272;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.deletable = true;
  }
  onLinkClick(tab) {
    if (tab.index === 0) {
      // this.getData();
      this.notes = [];
      this.notifications = [];
      this.syllabus = [];
    }
    else if (tab.index === 1) {
      if (this.dataService.user.roleId != 6) {
        this.getDataNotes();
      }
      this.notes = [];
      this.notifications = [];
      this.syllabus = [];
    }
    else if (tab.index === 2) {
      this.getDataNotifications();
      this.notes = [];
      this.notifications = [];
      this.syllabus = [];
    }

  }
  addNewNotification(data, value) {
    if (value === 1) {
      this.showAdd = false;
    }
    else if (value === 2) {
      let temp = {
        "department": data.department,
        "year": data.year,
        "semester": data.semester,
        "course": data.course,
        // "section": data.section,
        "subject": data.subject,
        "syllabus": data.syllabus,
        "isCompleted": data.isCompleted == 'True' || data.isCompleted == 1 ? 1 : 0,
        "startDate": this.dataService.convertDate(data.startDate, true),
        "endDate": this.dataService.convertDate(data.endDate, true),
        "businessId": this.dataService.user.businessId
      }
      //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

      let url = "professor/addSyllabus";
      this.dataService.getData(url, temp).subscribe(results => {
        if (!results || results.code === -1) {
          this.snackBar.open('Error Adding Syllabus', 'Ok', {
            duration: 5000,
          });
          return;
        }
        let urlFull = 'professor/viewSyllabus';
        this.newRecord = {};
        this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
          if (!results || results.code === -1) {
            this.data.data = [];
            return;
          }
          this.data.data = results.data;
          this.syllabus = results.data;
          this.snackBar.open('Syllabus Added Succesfully', 'Ok', {
            duration: 5000,
          });
          this.dataService.getDetails();
        });

      });
      this.showAddSyllabus = false;
      this.showTopics = false;
    }
    else if (value === 3) {
      let temp = {
        "department": data.department,
        "year": data.year,
        "semester": data.semester,
        "course": data.course,
        "section": data.section,
        "subject": data.subject,
        "topic": data.topic,
        "documents": data.documents,
        "description": data.description,
        "professorId": this.dataService.user.id,
        "businessId": this.dataService.user.businessId,
      }
      //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

      let url = "professor/addLectureNotes";
      this.dataService.getData(url, temp).subscribe(results => {
        if (!results || results.code === -1) {
          this.snackBar.open('Error Adding Lecture Notes', 'Ok', {
            duration: 5000,
          });
          return;
        }
        let urlFull = 'professor/viewLectureNotes';
        this.newRecord = {};
        this.dataService.getData(urlFull, { "professorId": this.dataService.user.id }).subscribe(results => {
          if (!results || results.code === -1) {
            this.data.data = [];
          } else
            this.data.data = results.data;
          this.notes.data = results.data;
          this.notes.columns = ['course', 'department', 'description', 'documents', 'id', 'section', 'semester', 'subject', 'topic', 'year'];
          this.snackBar.open('Lecture Notes Added Succesfully', 'Ok', {
            duration: 5000,
          });
          this.getDataNotes();
          this.dataService.getDetails();
        });

      });
      this.showAddNotes = false;
    }
    else {
      let temp = {
        "department": data.department,
        "course": data.course,
        "year": data.year,
        "semester": data.semester,
        "subject": data.subject,
        "chapter": data.chapter,
        "notification": data.notification,
        "businessId": this.dataService.user.businessId
      }
      let url = "professor/addNotification";
      this.dataService.getData(url, temp).subscribe(results => {
        if (!results || results.code === -1) {
          this.snackBar.open('Error Adding Notification', 'Ok', {
            duration: 5000,
          });
          return;
        }
        let urlFull = 'professor/getAllNotifications';

        this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
          if (!results || results.code === -1) {
            this.data.data = [];
          } else
            this.data.data = results.data;
            this.newRecord = {};
          this.notifications.data = results.data;
          this.snackBar.open('Notification Added Succesfully', 'Ok', {
            duration: 5000,
          });
          this.getDataNotifications();
          this.dataService.getDetails();
        });

      });
      this.showAddNotifications = false;
    }
  }

}
