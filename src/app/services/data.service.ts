import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class DataService {
    public selectedApp: object = {};
    public user: any;
    departments: any;
    sections: any;
    courses: any;
    staffId: any;
    exams: any;
    subjects: any;
    studentsId: any;
    professorSubjects: any;
    tempObj: any;
    professorExams: any;
    roles: any = {
        1: 'Admin',
        2: 'Professor',
        3: 'Library',
        4: 'Transport',
        5: 'Parent',
        6: 'Student',
        7: 'HOD',
        9: 'Hostel',
        10: 'Accounts',
        11: 'Canteen',
        12: 'SuperAdmin',
        13: 'Admission'
    };
    private serviceURL = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole';

    // old server
    private commonUrl = 'http://13.127.118.40:8080/collage-management/collage/';
    // new server
    // private commonUrl = 'http://13.233.80.43:8080/collage-management/collage/';
    
    constructor(private http: HttpClient, public router: Router, public snackBar: MatSnackBar) {
    }
    reset(details) {
        let url = "user/forgotPassword";
        this.getData(url, details).subscribe(results => {
            if (results.code === -1) {
                this.snackBar.open(results.message, 'Ok', {
                    duration: 5000,
                });
                return;
            }
            this.snackBar.open('Password Reset Successfully', 'Ok', {
                duration: 5000,
            });
            this.user = results.data;
            this.getDetails();
            this.router.navigateByUrl('/smartSchool');
        });
    }
    login(details): Observable<any[]> {
        let url = 'user/login';
        let users = ['Admin', 'Student', 'Professor', 'HOD', 'Parent', 'Library', 'Transport', 'Hostel'];
        this.user = {
            //selectedRole: 'Admin',
            schoolName: 'School Name To Display',
            schoolBranch: 'School Branch',
            lastUpdatedBy: 'Mr.Username ',
            lastUpdatedOn: '15 May, 2018',
            businessId: 1,
            userName: 'user1',
            studentId: 's12',
            "department": "btech",
            "course": "cse",
            "year": "1",
            "semester": "1",
            //selectedRole: '',
            selectedApp: this.selectedApp
        }
        this.user.selectedRole = details.username;
        // debugger;
        if (!details.password) {
            this.snackBar.open('Enter Password', 'Ok', {
                duration: 5000,
            });
        }
        else if (details.username && details.password) {
            this.getData(url, {
                "userName": details.username,
                "password": details.password
            }).subscribe(results => {
                if (results.code === -1) {
                    this.snackBar.open('Invalid Username or Password', 'Ok', {
                        duration: 5000,
                    });
                    return;
                }
                this.user = results.data;
                this.user.userName = this.user.username;
                this.user.selectedRole = this.roles[this.user.roleId];
                this.getDetails();
                this.router.navigateByUrl('/smartSchool');
            });
        }
        // this.getDetails();
        // this.router.navigateByUrl('/smartSchool');
        return this.user;
    };
    getUser(app): Observable<any> {
        return this.http.get<any>(this.serviceURL);
    }
    getDetails() {
        let businessObj = { businessId: this.user.businessId };
        //get departments
        let departmentUrl = 'admin/getDepartmentsByBusinessId';
        this.getData(departmentUrl, businessObj).subscribe(results => {
            if (!results || results.code === -1) {
                this.departments = [];
                return;
            }
            this.departments = results.data;
        });
        //get Sections
        let sectionsUrl = 'admin/getSections';
        this.getData(sectionsUrl, businessObj).subscribe(results => {
            if (!results || results.code === -1) {
                this.sections = [];
                return;
            }
            this.sections = results.data;
        });
        //get Exams
        let examsUrl = 'professor/getExamsByBusinessId';
        this.getData(examsUrl, businessObj).subscribe(results => {
            if (!results || results.code === -1) {
                this.exams = [];
                return;
            }
            this.exams = results.data;
        });
        //courses
        let coursesUrl = 'admin/getCourses';
        this.getData(coursesUrl, businessObj).subscribe(results => {
            if (!results || results.code === -1) {
                this.courses = [];
                return;
            }
            this.courses = results.data;
        });

        let subjectsUrl = 'admin/getAllSubjects';
        this.getData(subjectsUrl, businessObj).subscribe(results => {
            if (!results || results.code === -1) {
                this.subjects = [];
                return;
            }
            this.subjects = results.data;
            
        });
        this.getData('professor/getSubjectsForStudent', { userName: this.user.userName }).subscribe(results => {
            if (!results || results.code === -1) {
                this.professorSubjects = [];
                return;
            }
            this.professorSubjects = results.data;
        });

        this.getData('admin/getStudentByBusinessId', businessObj).subscribe(results => {
            if (!results || results.code === -1) {
                this.studentsId = [];
                return;
            }
            this.studentsId = results.data;
        });

    };
    getStaffId() {
        let url = "admin/getStaffIds";
        let businessObj = { businessId: this.user.businessId };
        this.http.post(this.commonUrl + url,businessObj).subscribe(results=>{
            this.staffId = results;
        })
    }
    deleteData(url): Observable<any> {
        return this.http.delete(this.commonUrl + url);
    }

    getData(url, data): Observable<any> {
        return this.http.post<any>(this.commonUrl + url, data);
        // return this.http.get<any[]>(url);
    }

    addDetail(newRecord, url): Observable<any[]> {
        return this.http.get<any[]>(url);
    }

    getRequest(url): Observable<any> {
        return this.http.get<any>(this.commonUrl + url);
    }

    deleteWithData(url, data): Observable<any> {
        return this.http.delete<any>(this.commonUrl + url, data);
    }

    putData(url, data): Observable<any> {
        return this.http.put<any>(this.commonUrl + url, data);
    }

    getObjectBy(data, filter) {
        var _return: any;
        for (var i = 0; i < data.length; i++) {
            if (data.hasOwnProperty(i) && this._searchObject(data[i], filter)) {
                _return = data[i];
            }
        }
        return _return ? _return : undefined;
    }

    _searchObject(obj, filter) {
        var found = false;
        var key = Object.keys(filter)
        if (obj[key[0]] == filter[key[0]])
            found = true;
        else
            found = false;
        return found;
    }

    getObjectsBy(data, filter) {
        var arrResult = [];
        for (var i = 0; i < data.length; i++) {
            if (data.hasOwnProperty(i) && this._searchObject(data[i], filter)) {
                arrResult.push(data[i]);
            }
        }
        return arrResult;
    }

    convertDate(date, out) {
        if (date) {
            if (out) {
                return date.valueOf();
            }
            else {
                let d = new Date(date);
                let month = String(d.getMonth() + 1);
                let day = String(d.getDate());
                const year = String(d.getFullYear());

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return `${day}/${month}/${year}`;
            }
        }
        else {
            return '';
        }
    }

}
