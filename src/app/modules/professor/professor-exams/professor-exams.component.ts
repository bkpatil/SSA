import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'professor-exams',
  templateUrl: './professor-exams.component.html',
  styleUrls: ['./professor-exams.component.scss']
})
export class ProfessorExamsComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ value: i });
    };
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
    this.data.updatable = true;
    this.data.deletable = true;
  }
  getData() {
    this.callGrid = false;
    let url = 'professor/getExamsByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'professor/deleteExams/';
    this.data.editUrl = 'professor/editExams';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
      this.data.deleteMethod = true;
      this.data.columns = ['id', 'course','department','year','semester','subject','section','examName','totalMarks','passMarks','question'];
      this.fields = [
        {
          field: 'id',
          label: 'Id',
          element: 'input',
          remove: true,
          hide: true,
          editable: false,
          update: true
        },
        {
          field: 'department',
          label: 'Department Name',
          element: 'dropdown',
          hide: false,
          editable: false,
          values: this.dataService.departments,
          update: true
        },
        {
          field: 'course',
          label: 'Course Name',
          element: 'dropdown',
          hide: false,
          editable: true,
          update: true,
          values: this.dataService.courses
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
          label: 'Subject Name',
          element: 'dropdown',
          hide: false,
          editable: true,
          update: true,
          values: this.dataService.professorSubjects
        },
        {
          field: 'section',
          label: 'Section',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: this.dataService.sections,
          // values: [
          //   { name: 'A', id: 'a' },
          //   { name: 'B', id: 'b' },
          //   { name: 'C', id: 'c' },
          // ],
          update: true
        },
        {
          field: 'examName',
          label: 'Exam Name',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'totalMarks',
          label: 'Total Marks',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'passMarks',
          label: 'Pass Marks',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'question',
          label: 'Questions',
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
      debugger
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      this.data.data = [];
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
      this.data.data = results.data;
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(details) {
    let temp = {
      "department": details.department,
      "course": details.course,
      "year": details.year,
      "semester": details.semester,
      "subject": details.subject,
      "section": details.section,
      "examName": details.examName,
      "totalMarks": details.totalMarks,
      "passMarks": details.passMarks,
      "questions": [details.question],
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "professor/addExams";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Exam', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'professor/getExamsByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.newRecord = {};
        this.data.data = results.data;
        this.snackBar.open('Exam Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Exam Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    this.callGrid = false;
    this.getData();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }
}

