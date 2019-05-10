import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'professor-results',
  templateUrl: './professor-results.component.html',
  styleUrls: ['./professor-results.component.scss']
})
export class ProfessorResultsComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  button: any;
  newRecord: any = {};
  years: any = [];
  searchFields: any;
  searchFields1; any;
  tempValue: any;
  showResults: boolean = false;
  url: any;
  marks: any = [0];
  subjects: any = [];
  markSheet: any = [];
  students: any = [];
  professor: boolean;
  fileName: any;
  showExams: boolean = false;
  exams: any = [];
  constructor(private http: HttpClient, private dataService: DataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.showResults = false;
    this.user = this.dataService.user;
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };
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
      },
      {
        field: 'section',
        label: 'Section',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: 'A', id: 'A' },
          { name: 'B', id: 'B' },
          { name: 'C', id: 'C' },
        ],
        update: true
      },
      {
        field: 'subjectName',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.professorSubjects
      },
      {
        field: 'exams',
        label: 'Exam',
        element: 'dropdown',
        hide: true,
        editable: true,
        values: this.dataService.professorExams,
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
     
      {
        field: 'subjectName',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.professorSubjects
      },
      {
        field: 'exams',
        label: 'Exam',
        element: 'dropdown',
        hide: true,
        editable: true,
        values: this.dataService.professorExams,
        update: true
      },
      {
        field: 'section',
        label: 'Section',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: 'A', id: 'A' },
          { name: 'B', id: 'B' },
          { name: 'C', id: 'C' },
        ],
        update: true
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ]

  }
  valueChange() {
    this.showExams = false;
    if (this.newRecord.year && this.newRecord.semester && this.newRecord.course && this.newRecord.department && this.newRecord.subjectName) {
      var objTemp =
      {
        "year": this.newRecord.year,
        "semester": this.newRecord.semester,
        "businessId": this.dataService.user.businessId,
        "course": this.newRecord.course,
        "department": this.newRecord.department
      };
      this.dataService.getData('professor/getExamsForProfessor', objTemp).subscribe(results => {
        if (results.data) {
          this.exams = results.data;
          this.showExams = true;
        }
      });
    }
  }
  ngAfterContentChecked() {
    this.getHeightWidth();
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = false;
    this.data.detailsPopUp = true;
  }
  getData() {
    let url = this.url;
    this.data.url = url;
    this.callGrid = false;
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
      //this.fields = [];
      this.data.dynamicColumns = true;
      this.data.detailsPopup = true;
      this.callGrid = true;
      this.newRecord = {};
    });
  }

  onSearch(student) {
    if (!student)
      student = this.tempValue;
    else
      this.tempValue = student;
    let temp: any = {
      "year": student.year || '',
      "semester": student.semester || '',
      "course": student.course || '',
      "department": student.department || '',
      "businessId": this.dataService.user.businessId
    }
    if (this.url === 'internals/getInternalMarks') {
      temp.internalName = student.exams;
    } else {
      temp.externalName = student.exams;
    }
    this.data.objTemp = temp;
    this.getData();
  }

  onSearchP(student) {
    if (!student)
      student = this.tempValue;
    else
      this.tempValue = student;
    let temp: any = {
      "year": student.year || '',
      "semester": student.semester || '',
      "course": student.course || '',
      "department": student.department || '',
      "subjectName": student.subjectName || '',
      "businessId": this.dataService.user.businessId
    }
    if (this.url === 'professor/getInternalResultsByProfessor') {
      temp.internalName = student.exams;
    } else {
      temp.externalName = student.exams;
    }
    this.data.objTemp = temp;
    this.getData();
  }

  addNewStudent(student) {
    this.data.data.push(this.newRecord);
    this.flip();
    this.dataService.getDetails();
  }

  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
    this.fileName = '';
  }

  public onFileInput($event, field) {
    const fileSelected: File = $event.target.files[0];
    const _formData = new FormData();
    _formData.append('file', fileSelected, fileSelected.name);
    this.http.post('http://13.127.118.40:8080/collage-management/collage/' + this.url, _formData)
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data.data) {
            //this.flip();
            // this.snackBar.open(data.data + ' Uploaded Succesfully', 'Ok', {
            //   duration: 5000,
            // });
            this.fileName = data.data;
          }
        },
        error => {
          console.log(error);
        },
    );
  }

  displayResults(type) {
    this.callGrid = false;
    if (type === 'internal') {
      this.url = 'internals/saveInternalMarks';
      this.button = " Report Internal Marks";
      //this.data.columns = ['studentId','department','course','year','semester','internalName','subjectName','marks'];
      this.professor = false;
    }
    else if (type === 'external') {
      this.url = 'external/saveExternalMarks';
      this.button = " Report External Marks";
      //this.data.columns = ['studentId','department','course','year','semester','externalName','subjectName','marks'];
      this.professor = false;
    }
    else if (type === 'externalP') {
      this.url = 'professor/getExternalResultsByProfessor';
      this.button = " Get External Marks";
      //this.data.columns = ['studentId','department','course','year','semester','externalName','subjectName','marks'];
      this.professor = true;
    }
    else if (type === 'internalP') {
      //this.data.columns = ['studentId','department','course','year','semester','internalName','subjectName','marks'];
      this.url = 'professor/getInternalResultsByProfessor';
      this.button = " Get Internal Marks";
      this.professor = true;
    }

    this.flip();
  }

  openSearch() {
    let dialogRef = this.dialog.open(PopupComponent, {
      data: {
        fields: this.searchFields,
        data: {},
        gridData: this.data,
        button: 'View',
        url: 'https://api.myjson.com/bins/rgabi',
        name: 'Search'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.callGrid = false;
      //this.data = result.gridData;
    });
  }

  addClick() {
    var temp = {
      "department": this.newRecord.department,
      "course": this.newRecord.course,
      "businessId": this.dataService.user.businessId,
      "year": this.newRecord.year,
      "semester": this.newRecord.semester,
      "isActive":"1",
      "section": this.newRecord.section,
    }
    this.dataService.getData('admin/getStudents', temp).subscribe(results => {
      if (results.data) {
        for (let i = 0; i < results.data.length; i++) {
          var temp = {
            SNo: i + 1,
            studentId: results.data[i].studentId,
            studentName: results.data[i].firstName + ' ' + results.data[i].lastName,
            subjectName: this.newRecord.subjectName,
            exams: this.newRecord.exams,
            marks: '',

          }
          this.students.push(temp);
        }
        this.showResults = true;
      }
    });
  }
  addRow() {
    this.marks.push(this.marks.length);
  }
  submitResults() {
    var temp = {}, url;
    if (this.url === 'internals/saveInternalMarks') {
      url = 'internals/addInternals';
      delete this.newRecord.externalName;
      this.newRecord.internalName = this.newRecord.exams;
    } else {
      url = 'external/addExternal';
      delete this.newRecord.internalName;
      this.newRecord.externalName = this.newRecord.exams;
    }
    delete this.newRecord.exams;
    for (var i = 0; i < this.students.length; i++) {
      temp[this.students[i].studentId] = Number(this.students[i].marks);
    }
    if (url === 'external/addExternal') {
      this.newRecord.studentMarks = temp;
    }
    else
      this.newRecord.totalMarks = temp;
    this.newRecord.businessId = this.dataService.user.businessId;
    this.dataService.getData(url, this.newRecord).subscribe(results => {
      this.showResults = false;
      this.newRecord = {};
      this.subjects = [];
      this.markSheet = [];
      this.marks = [0];
      this.students = [];
      this.exams = [];
      this.flip();
    });
  }
}
