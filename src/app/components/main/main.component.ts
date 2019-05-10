import { Component, OnInit, HostListener } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DataService } from './../../services/data.service';
declare var jquery: any;
declare var $: any;
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PPopupComponent } from './../profile-popup/popup.component';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
	title = 'app';
	mode: string;
	open: boolean;
	selectedApp: Object;
	appList: any[];
	user: any;
	data: any;
	showMenu: any;
	showLogin: boolean = true;
	userName: any;
	password: any;
	constructor(public dialog: MatDialog, public snackBar: MatSnackBar, public overlayContainer: OverlayContainer, public router: Router, private dataService: DataService) {
		this.configureSideNav();

	}
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.configureSideNav()
	}
	ngOnInit() {
		this.user = this.dataService.user;
		if (!this.user) {
			this.router.navigateByUrl('');
		}
		else {
			setTimeout(function () { $('.list-wrapper').fadeOut() }, 5000);
			setTimeout(function () {
				$(".nav-list").mouseover(function () {
					$('.list-wrapper').fadeIn();
				});
				$('.nav-list').mouseleave(function () {
					setTimeout(function () { $('.list-wrapper').fadeOut() }, 1000);
				});
			}, 5000);

			if (this.user.selectedRole === 'Admin') {
				this.appList = [
					{ id: 1, name: 'Dashboards', icon: 'D' },
					{ id: 10, name: 'Courses', icon: 'D' },
					{ id: 8, name: 'Departments', icon: 'D' },
					{ id: 20, name: 'Section', icon: 'D' },
					{ id: 9, name: 'Subjects', icon: 'S' },
					{ id: 15, name: 'Lessons', icon: 'S' },
					{ id: 17, name: 'Topics', icon: 'S' },
					{ id: 3, name: 'Professors', icon: 'P' },
					{ id: 4, name: 'Librarian', icon: 'L' },
					{ id: 14, name: 'Accountants', icon: 'S' },
					{ id: 18, name: 'Transport', icon: 'L' },
					{ id: 19, name: 'Hostel', icon: 'L' },
					// { id: 21, name: 'Examination', icon: 'L' },
					{ id: 22, name: 'Infrastructure', icon: 'L' },
					{ id: 11, name: 'Employees', icon: 'E' },
					{ id: 12, name: 'Staff', icon: 'S' },
					{ id: 13, name: 'Holidays', icon: 'S' },
					{ id: 23, name: 'Canteen', icon: 'S' },
				];
			}
			else if (this.user.selectedRole === 'Library') {
				this.appList = [
					{ id: 1, name: 'Library', icon: 'L' },
					{ id: 2, name: 'dueBooks', icon: 'D' },
					{ id: 3, name: 'lendBooks', icon: 'D' },
					{ id: 0, name: 'Email', icon: 'X' }

				];
			}
			else if (this.user.selectedRole === 'Student') {
				this.appList = [
					{ id: 1, name: 'Dashboards', icon: 'D' },
					{ id: 2, name: 'Academics', icon: 'S' },
					{ id: 3, name: 'Attandance', icon: 'A' },
					{ id: 8, name: 'Results', icon: 'A' },
					{ id: 4, name: 'Calendar', icon: 'C' },
					{ id: 5, name: 'Library', icon: 'L' },
					{ id: 6, name: 'FeePayment', icon: 'R' },
					{ id: 7, name: 'Feedback', icon: 'F' },
					// { id: 9, name: 'LiveTracking', icon: 'R' },
					// { id: 8, name: 'Requests', icon: 'D' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
			else if (this.user.selectedRole === 'Parent') {
				this.appList = [
					{ id: 1, name: 'Dashboards', icon: 'D' },
					{ id: 2, name: 'Attandance', icon: 'A' },
					{ id: 3, name: 'Results', icon: 'R' },
					{ id: 4, name: 'FeePayment', icon: 'R' },
					{ id: 5, name: 'LiveTracking', icon: 'R' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
			else if (this.user.selectedRole === 'Hostel') {
				this.appList = [
					{ id: 1, name: 'Hostels', icon: 'D' },
					{ id: 2, name: 'Allocations', icon: 'A' },
					{ id: 3, name: 'OutingPass', icon: 'A' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
			else if (this.user.selectedRole === 'Transport') {
				this.appList = [
					{ id: 1, name: 'Buses', icon: 'D' },
					{ id: 2, name: 'Drivers', icon: 'A' },
					//{ id: 3, name: 'BusDetails', icon: 'A' },
					{ id: 4, name: 'Stops', icon: 'A' },
					{ id: 5, name: 'Management', icon: 'A' },
					{ id: 6, name: 'Allocations', icon: 'A' },
					{ id: 7, name: 'Expenses', icon: 'A' },
					{ id: 8, name: 'BusTrack', icon: 'A' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
			else if (this.user.selectedRole === 'Professor') {
				this.appList = [
					{ id: 1, name: 'Dashboards', icon: 'D' },
					{ id: 2, name: 'Academics', icon: 'A' },
					{ id: 3, name: 'Attandance', icon: 'A' },
					{ id: 4, name: 'Results', icon: 'A' },
					{ id: 5, name: 'Exams', icon: 'A' },
					{ id: 6, name: 'Library', icon: 'L' },
					{ id: 7, name: 'Feedback', icon: 'F' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
			else if (this.user.selectedRole === 'HOD') {
				this.appList = [
					{ id: 1, name: 'Dashboards', icon: 'D' },
					{ id: 2, name: 'Academics', icon: 'A' },
					{ id: 3, name: 'Attandance', icon: 'A' },
					{ id: 4, name: 'Results', icon: 'A' },
					{ id: 5, name: 'Exams', icon: 'A' },
					{ id: 6, name: 'Library', icon: 'L' },
					{ id: 7, name: 'Feedback', icon: 'F' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
			else if (this.user.selectedRole === 'Accounts') {
				this.appList = [
					{ id: 1, name: 'School Expenses', icon: 'D' },
					{ id: 2, name: 'Store Expenses', icon: 'A' },
					{ id: 10, name: 'Infrastructures', icon: 'A' },
					{ id: 11, name: 'Other Expenses', icon: 'A' },
					{ id: 3, name: 'Student Fees', icon: 'A' },
					{ id: 4, name: 'Employee Salary', icon: 'A' },
					{ id: 6, name: 'Condonation', icon: 'L' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
			else if (this.user.selectedRole === 'Canteen') {
				this.appList = [
					{ id: 1, name: 'Menu', icon: 'D' },
					// { id: 2, name: 'Feedback', icon: 'A' },
					{ id: 3, name: 'Expenses', icon: 'A' },
					{ id: 4, name: 'Sales Report', icon: 'A' },
					{ id: 6, name: 'Orders', icon: 'L' },
					{ id: 5, name: 'Cancel Order', icon: 'L' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
			else if (this.user.selectedRole === 'SuperAdmin') {
				this.appList = [
					{ id: 4, name: 'Dashboards', icon: 'D' },
					{ id: 1, name: 'Schools', icon: 'D' },
					{ id: 2, name: 'Colleges', icon: 'A' },
					{ id: 3, name: 'Admins', icon: 'A' },
					{ id: 0, name: 'Email', icon: 'X' }
				];
			}
		}
	}
	ngOnChanges() {
		this.user = this.dataService.user;
		setTimeout(function () { $('.list-wrapper').hide() }, 5000);
		$(".nav-list").mouseover(function () {
			$('.list-wrapper').show();
		});
		$('.nav-list').mouseleave(function () {
			setTimeout(function () { console.log('init leave'); $('.list-wrapper').hide() }, 1000);
		});
	}

	changeTheme() {
		document.body.classList.toggle('light-theme');
		// this.overlayContainer.getContainerElement().classList.toggle('light-theme');
	}

	onAppSelect(item) {
		this.selectedApp = item;
		this.dataService.user.selectedApp = this.user.selectedApp = item;
	}

	onLogin() {
		let details = {
			username: this.userName,
			password: this.password
		};
		let data = this;
		this.dataService.login(details).subscribe(data => {
			this.loginSucess(data);
		})
	};

	logOut() {
		this.dataService.getData('user/logout', { "userName": this.dataService.user.username }).subscribe(results => {
			debugger
			if (!results || results.code === -1) {
				return;
			}
			this.user = {};
			this.router.navigateByUrl('');
		});
	};

	loginSucess(data) {
		let appList: any = {};
		this.user = data.dataService.user;
	}

	configureSideNav() {

		if (window.innerWidth < 950) {
			this.mode = "over"
			this.open = false
		} else {
			this.mode = 'side'
			this.open = true
		}
	}


	saveProfile() {
		let url = '';
		if (this.user.selectedRole === 'Admin') {
			url = 'admin/editProfile';
		}
		else if (this.user.selectedRole === 'Library') {
			url = 'library/editProfile';
		}
		else if (this.user.selectedRole === 'Student') {
			url = 'student/editProfile';
		}
		else if (this.user.selectedRole === 'Professor') {
			url = 'professor/editProfile';
		}
		else if (this.user.selectedRole === 'HOD') {
			url = 'hod/editProfile';
		}
		this.data.dob = this.dataService.convertDate(this.data.dob, true);
		this.dataService.getData(url, this.data).subscribe(results => {
			if (!results || results.code === -1) {
				this.snackBar.open('Problem in updating profile', 'Ok', {
					duration: 5000,
				});
			} else
				this.snackBar.open('Profile Updated Succesfully', 'Ok', {
					duration: 5000,
				});

		});
	}

	editProfile() {
		let url = '';
		if (this.user.selectedRole === 'Admin') {
			url = 'admin/viewProfile';
		}
		else if (this.user.selectedRole === 'Library') {
			url = 'library/viewProfile';
		}
		else if (this.user.selectedRole === 'Student') {
			url = 'student/viewProfile';
		}
		else if (this.user.selectedRole === 'Professor') {
			url = 'professor/viewProfile';
		}
		else if (this.user.selectedRole === 'HOD') {
			url = 'hod/viewProfile';
		}
		this.dataService.getData(url, { userName: this.dataService.user.userName }).subscribe(results => {
			if (!results || results.code === -1) {
				this.data = {};
			} else
				this.data = results.data;

			let dialogRef = this.dialog.open(PPopupComponent, {
				data: this.data
			});

		});
	}

	mail() {
		var temp = this.dataService.getObjectsBy(this.appList, { active: true });
		for (var i = 0; i < temp.length; i++) {
			temp[i].active = false;
		}
		this.selectedApp = { id: 0, name: 'Email', icon: 'X', active: true };
		this.onAppSelect(this.selectedApp);
		// this.dataService.user.selectedApp = this.user.selectedApp = this.selectedApp;
	}
}
