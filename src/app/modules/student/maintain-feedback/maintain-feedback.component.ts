import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'maintain-feedback',
  templateUrl: './maintain-feedback.component.html',
  styleUrls: ['./maintain-feedback.component.scss']
})
export class MaintainFeedbackComponent implements OnInit {
  rating: any = {};
  data: any = {};
  height: any;
  i: any;
  fields: any;
  callGrid: boolean = false;
  frontVisible: boolean = true;
  department: any;
  years: any;
  semesters: any;
  professors:any = [];
  showDropdown:boolean = false;
  showSubjectDropdown:boolean = false;
  subjects:any = [];
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.height = 400;
    this.getData('professor');
    this.department = 'professor';
    this.years = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
    ];
    this.semesters = [
      { name: '1', id: '1' },
      { name: '2', id: '2' }

    ];
  }
  ngAfterContentChecked() {
    this.getHeightWidth();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
    this.getData(this.department);
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
  departmentSelect(department) {
    if (department === "professor") {
      this.data = {
        detailfield: 'Subject',
        otherField: 'Professor Name',
        data: ["Professor 1", "Professor 2", "Professor 3", "Professor 4", "Professor 5", "Professor 6", "Professor 7"],
        fields: ["Behaviour", "Teaching", "Live Examples"]
      }
    }
    else if (department === "transport") {
      this.data = {
        detailfield: 'Driver Name',
        otherField: 'Driver Id',
        data: ["Bus Number 1", "Bus Number 2", "Bus Number 3", "Bus Number 4", "Bus Number 5", "Bus Number 6", "Bus Number 7"],
        fields: ["Behaviour", "Driving", "Condition", "Timing"]
      }
    }
    else if (department === "hostel") {
      this.data = {
        detailfield: 'Hostel Block',
        data: ["Girls", "Boys"],
        fields: ["Food", "Rooms", "Washrooms", "Facilities"]
      }
    }
    this.i = 0;
    this.department = department;
  }
  getData(department) {
    var url = '',
      objTemp = {
        "userName": this.dataService.user.userName
      }
    this.callGrid = false;
    this.data.columns = undefined;
    this.data.additionalProperties = { businessId: this.dataService.user.businessId, "userName": this.dataService.user.userName };
    if (department === "professor") {
      url = 'student/viewFeedback';
      this.data.url = url;
      this.data.deleteUrl = 'student/deleteFeedback/';
      this.data.editUrl = 'student/updateFeedback';
      this.data.objTemp = objTemp;
      this.data.columns = ['id', 'department', 'year', 'course', 'semester', 'lecturerName', 'subject', 'behaviour', 'teaching', 'liveExamples', 'overAllFeedback', 'comments'];
      this.data.deleteMethod = true;
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
          field: 'studentId',
          label: 'Student Id',
          element: 'input',
          hide: false,
          editable: false,
          update: false
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
          field: 'lecturerName',
          label: 'Professor Name',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'subject',
          label: 'Subject',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'behaviour',
          label: 'Behaviour',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'teaching',
          label: 'Teaching',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'liveExamples',
          label: 'live Examples',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'overAllFeedback',
          label: 'OverAll Feedback',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: false,
          values: [
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" },
            { id: "5" },
          ]
        },
        {
          field: 'comments',
          label: 'Comments',
          element: 'input',
          hide: false,
          editable: false,
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
    else if (department === "transport") {
      url = 'bus/viewTransportFeedBack';
      this.data.url = url;
      this.data.deleteUrl = 'bus/deleteTransportFeedBack';
      this.data.editUrl = 'bus/editTransportFeedBack';
      this.data.deleteMethod = false;
      this.data.objTemp = objTemp;
      this.data.columns = ['id','studentId','driverId','driverName','behaviour','condition','driving','timing','overAllFeedBack','comments'];
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
          field: 'studentId',
          label: 'Student Id',
          element: 'input',
          hide: false,
          editable: false,
          update: false
        },
        {
          field: 'userName',
          label: 'userName',
          element: 'input',
          hide: true,
          editable: false,
          update: false
        },
        {
          field: 'driverName',
          label: 'Driver Name',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'driverId',
          label: 'Driver Id',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'businessId',
          label: 'Business Id',
          element: 'input',
          hide: false,
          editable: false,
          update: false
        },
        {
          field: 'behaviour',
          label: 'Behaviour',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'driving',
          label: 'Driving',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'timing',
          label: 'Timing',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'condition',
          label: 'Condition',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'rating',
          label: 'Rating',
          element: 'dropdown',
          hide: true,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'overAllFeedBack',
          label: 'OverAll Feedback',
          element: 'dropdown',
          hide: true,
          editable: false,
          update: true,
          values: [
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" },
            { id: "5" },
          ]
        },
        {
          field: 'comments',
          label: 'Comments',
          element: 'input',
          hide: false,
          editable: false,
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
    else if (department === "hostel") {
      url = 'hostel/viewHostelFeedback';
      this.data.url = url;
      this.data.deleteUrl = 'hostel/deleteFeedback/';
      this.data.editUrl = 'hostel/editHostelFeedback';
      this.data.objTemp = objTemp;
      this.data.deleteMethod = true;
      this.data.columns = ['id','studentId','buildingName','facilities','food','rooms','washRooms','overAllFeedback','comments'];
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
          field: 'userName',
          label: 'userName',
          element: 'input',
          hide: true,
          editable: false,
          update: false
        },
        {
          field: 'studentId',
          label: 'Student Id',
          element: 'input',
          hide: false,
          editable: false,
          update: false
        },
        {
          field: 'buildingName',
          label: 'Building Name',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'businessId',
          label: 'Business Id',
          element: 'input',
          hide: false,
          editable: false,
          update: false
        },
        {
          field: 'food',
          label: 'Food',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'rooms',
          label: 'Rooms',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'washRooms',
          label: 'WashRooms',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'facilities',
          label: 'Facilities',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: true,
          values: [
            { id: 1 },
            { id: 2},
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'overAllFeedback',
          label: 'Over All Feedback',
          element: 'dropdown',
          hide: false,
          editable: false,
          update: false,
          values: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
          ]
        },
        {
          field: 'comments',
          label: 'Comments',
          element: 'input',
          hide: false,
          editable: false,
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
    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
      //this.data.dynamicColumns = true;
      //this.fields = [];
      this.callGrid = true;
    });
  }
  onDelete(flag) {
    this.snackBar.open('Feedback Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    this.callGrid = false;
    this.getData(this.department);
  }
  getSubjects() {
    this.showSubjectDropdown = false;
    if (this.rating.semester && this.rating.departmentValue && this.rating.year && this.rating.course) {
      let temp = {
        "year": this.rating.year,
        "semester": this.rating.semester,
        "businessId": this.dataService.user.businessId,
        "course": this.rating.course,
        "department": this.rating.departmentValue
      }
      this.dataService.getData('student/viewSubjectsForStudent', temp).subscribe(results => {
        if (!results || results.code === -1) {
          this.subjects = [];
        } else
          this.subjects = results.data;
        this.showSubjectDropdown = true;
      });
    }
  }
  getProfessors(){
    this.showDropdown = false;
    if(this.rating.value && this.rating.departmentValue && this.rating.year){
      let temp ={
        "yearToTeach":this.rating.year,
        "subjects":this.rating.value,
        "department":this.rating.departmentValue
      }
      this.dataService.getData('student/listOfProfessors', temp).subscribe(results => {
        if (!results || results.code === -1) {
          this.professors = [];
        } else
          this.professors = results.data;
          this.showDropdown = true;
      });
    }
  }
  postFeedback() {
    let url = '',
      temp = {};
    if (this.department === "professor") {
      temp = {
        // "studentId": this.dataService.user.id,
        "department": this.rating.departmentValue,
        "course": this.rating.course,
        "year": this.rating.year,
        "semester": this.rating.semester,
        "lecturerName": this.rating.value2,
        "subject": this.rating.value,
        "behaviour": this.rating.Behaviour + '',
        "teaching": this.rating.Teaching + '',
        "liveExamples": this.rating['Live Examples'] + '',
        "comments": this.rating.comments + '',
        //"overAllFeedback": this.rating.OverAllFeedback + '',
        "userName": this.dataService.user.userName,
        "businessId": this.dataService.user.businessId
      }
      url = "student/submitFeedback";
    }
    else if (this.department === "transport") {
      temp = {
        "userName": this.dataService.user.userName,
        "driverName": this.rating.value,
        "driverId": this.rating.value2,
        "behaviour": this.rating.Behaviour + '',
        "driving": this.rating.Driving + '',
        "condition": this.rating.Condition + '',
        "timing": this.rating.Timing,
        "comments": this.rating.comments,
        // "rating": this.rating.rating,
        //"overAllFeedBack": this.rating.overAllFeedBack + '',
        "businessId": this.dataService.user.businessId
      }
      url = "bus/addTransportFeedBack";
    }
    else if (this.department === "hostel") {
      temp = {
        "userName": this.dataService.user.userName,
        //"studentId": this.dataService.user.id,
        "buildingName": this.rating.value,
        "comments": this.rating.comments,
        "food": this.rating.Food + '',
        "rooms": this.rating.Rooms + '',
        "washRooms": this.rating.Washrooms + '',
        //"overAllFeedback": this.rating.OverAllFeedback,
        "facilities": this.rating.Facilities + '',
        "businessId": this.dataService.user.businessId
      }
      url = "hostel/submitHostelFeedback";
    }
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Submitting Feedback', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.snackBar.open('Feedback Submitted Succesfully', 'Ok', {
        duration: 5000,
      });
      this.clearFeedback();
    });
  }

  clearFeedback() {
    let department = this.rating.department;
    this.rating = {};
    this.rating.department = department;
  }

}
