import { Component, Output, Renderer, Input, OnInit, EventEmitter, ViewChild, ElementRef, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { DataService } from './../../services/data.service';
import { PopupComponent } from './../popup/popup.component';
import { APopupComponent } from './../attendance-popup/popup.component';
import { RPopupComponent } from './../results-popup/popup.component';
import { DetailsComponent } from './../details/details.component';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'data-grid',
	templateUrl: './data-grid.component.html',
	styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@Input() selectedApp: Object;
	@Input() data: any;
	@Input() fields: any;
	@Output() ondelete = new EventEmitter();
	@Output() attendance = new EventEmitter();
	height: any;
	displayedColumns = [];
	gridOptions: any;
	dataSource: MatTableDataSource<any>;
	start: any = undefined;
	pressed: boolean = false;
	startX: any;
	startWidth: any;
	resizableFnMousemove: () => void;
	resizableFnMouseup: () => void;

	constructor(private dataService: DataService, public snackBar: MatSnackBar, public renderer: Renderer, public dialog: MatDialog, private elementRef: ElementRef) {

	}

	ngOnInit() {
		this.getServerData();
		//this.calculateGridHeight(false);
	}

	calculateGridHeight(recalculateFlag) {
		// const grid_body_height = this.elementRef.nativeElement.firstElementChild.children[1].offsetHeight;
		// const grid_body = this.elementRef.nativeElement.firstElementChild.children[1].offsetParent.offsetTop;
		// const grid_footer = this.elementRef.nativeElement.firstElementChild.children[2].offsetHeight;
		// const height = 547 - (grid_body + grid_footer) + 75;
		// //if ((!this.height && height > 0)) {
		// 	this.height = height - 80 ;
		// // }
		// // if (recalculateFlag && height > 0)
		// // 	this.height = height - 20;
		//  console.log(height);
		this.data.maxHeight = this.data.height - 87;
	}

	ngAfterContentChecked() {
		//this.calculateGridHeight(false);
	}
	ngAfterContentInit() {
		//this.getServerData();
	}
	ngOnChanges(changes) {
		//this.getServerData();
		// this.calculateGridHeight(true);
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}
	getServerData() {
		this.data.maxHeight = this.data.height - 87;
		let columns: string[];
		if (!this.data) {
			return;
		}
		if (this.data) {
			this.dataSource = new MatTableDataSource(this.data.data);
			this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;

			if (this.data && this.data.data && this.data.data.length) {
				this.displayedColumns = [];
				if (this.data.columns && this.data.columns.length) {
					this.displayedColumns = this.data.columns;
				}
				else {
					for (let key in this.data.data[0]) {
						if (this.data.excludeFields && this.data.excludeFields.length &&
							this.data.excludeFields.indexOf(key) === -1) {
							this.displayedColumns.push(key)
						}
						if (!this.data.excludeFields)
							this.displayedColumns.push(key)
					}
				}
			}
		}
		if (this.data.dynamicColumns || (this.data.columns && !this.fields.length)) {
			this.fields = [];
			for (var i = 0; i < this.displayedColumns.length; i++) {
				var obj: any = {};
				obj.field = this.displayedColumns[i];
				obj.label = this.displayedColumns[i];
				obj.element = 'input';
				this.fields.push(obj);
			}
			if (this.data.updatable) {
				this.fields.push({
					field: 'actions',
					label: 'Actions',
					element: '',
					hide: false,
					editable: true
				});
			}
		}
		if (this.data.excludeFields && this.data.excludeFields.length) {
			for (let i = 0; i < this.data.excludeFields.length; i++) {
				let temp = this.dataService.getObjectBy(this.fields, { field: this.data.excludeFields[i] }),
					field = this.data.excludeFields[i];
				if (temp) {
					let index = this.fields.indexOf(temp);
					if (index > -1) {
						this.fields.splice(index, 1);
					}
				}
				for (let j = 0; j < this.data.data.length; j++) {
					delete this.data.data[j][field];
				}
			}
		}
		if (this.data.updatable && this.fields[this.fields.length - 1].field !== 'actions' && this.dataService.user.roleId == 6) {
			this.fields.push({
				field: 'actions',
				label: 'Actions',
				element: '',
				hide: false,
				editable: true
			});
		}
		if (this.fields && this.fields.length && this.fields[this.fields.length - 1].field === 'actions') {
			if (this.data && this.data.updatable && this.data.data && this.data.data.length) {
				for (let i = 0; i < this.data.data.length; i++) {
					this.data.data[i].actions = '';
				}
				//console.log(this.data.data);
			}
			if ((this.data.updatable || this.data.deletable || this.data.details) && this.displayedColumns.indexOf('actions') === -1)
				this.displayedColumns.push('actions');
		}
		if (this.data.detailsPopUp) {
			this.fields.push({
				field: 'actions',
				label: 'Actions',
				element: '',
				hide: false,
				editable: true
			});
			this.displayedColumns.push('actions');
		}
		if (this.data.menuDetails) {
			this.fields.push({
				field: 'actions',
				label: 'Actions',
				element: '',
				hide: false,
				editable: true
			});
			this.displayedColumns.push('actions');
		}
		this.gridOptions = {
			rowData: this.data.data,
			columnDefs: this.displayedColumns,
			enableColResize: true,
			enableSorting: true,
			enableFilter: true
		}
	}

	private onMouseDown(event) {
		this.start = event.target;
		this.pressed = true;
		this.startX = event.x;
		this.startWidth = $(this.start).parent().width();
		this.initResizableColumns();
	}

	private initResizableColumns() {
		this.renderer.listenGlobal('body', 'mousemove', (event) => {
			if (this.pressed) {
				let width = this.startWidth + (event.x - this.startX);
				$(this.start).parent().css({ 'min-width': width, 'max-   width': width });
				let index = $(this.start).parent().index() + 1;
				$('.glowTableBody tr td:nth-child(' + index + ')').css({ 'min-width': width, 'max-width': width });
			}
		});
		this.renderer.listenGlobal('body', 'mouseup', (event) => {
			if (this.pressed) {
				this.pressed = false;
			}
		});
	}
	PrintUser(item) {
		console.log('print');
	}
	convertDate(date) {
		return this.dataService.convertDate(date, false);
	}
	convertArray(value) {
		return value.length ? value.join(',') : '';
	}
	getDropdownValues(data, field) {
		if (field.values) {
			var temp = this.dataService.getObjectBy(field.values, { id: data });
			if (temp)
				return temp[field.field] || temp.name || temp.id;
		}
		return data;
	}

	editItem(item, readOnly, attendance) {
		var temp = {};
		if (attendance) {
			if (this.data.menuDetails) {
				if (item.itemDetailsList) {
					let data: any = {};
					data.callGrid = true;
					data.emptyData = false;
					var tempData = [];
					data.data = item.itemDetailsList;
					//data.dynamicColumns = true;
					data.width = 600;
					data.height = 300;
					data.showFilter = false;
					data.showFooter = false;
					data.updatable = false;
					data.deletable = false;
					data.details = true;
					data.dynamicColumns = true;
					data.title = "Order Details";
					let dialogRef = this.dialog.open(APopupComponent, {
						data: data
					});
				}
			}
			else {
				temp = {
					studentId: item.studentId
				};
				if (item.attendances) {
					let data: any = {};
					data.callGrid = true;
					data.emptyData = false;
					var tempData = [];
					for (var i = 0; i < item.attendances.length; i++) {
						item.attendances[i].date = item.attendances[i].date.substring(0, 9);
						item.attendances[i].inTime = item.attendances[i].inTime.substring(10, 18);
						item.attendances[i].outTime = item.attendances[i].outTime ? item.attendances[i].outTime.substring(10, 18) : item.attendances[i].outTime;
					}
					data.data = item.attendances;
					//data.dynamicColumns = true;
					data.width = 600;
					data.height = 300;
					data.studentId = item.studentId;
					data.totalAbsentPercentage = item.totalAbsentPercentage;
					data.totalPresentPercentage = item.totalPresentPercentage;
					data.showFilter = false;
					data.showFooter = false;
					data.updatable = false;
					data.deletable = false;
					data.details = true;
					this.data.columns
					// data.fields = [
					// 	{
					// 		field: 'date',
					// 		label: 'Date',
					// 		element: 'date',
					// 		hide: false,
					// 		editable: true
					// 	},
					// 	{
					// 		field: 'attendance',
					// 		label: 'Attendance',
					// 		element: 'input',
					// 		hide: false,
					// 		editable: true
					// 	}

					// ];
					data.dynamicColumns = true;
					let dialogRef = this.dialog.open(APopupComponent, {
						data: data
					});
				}
				else if (item.subjects) {
					let data: any = {};
					data.callGrid = true;
					data.emptyData = false;
					var tempData = [];
					for (var i = 0; i < item.subjects.length; i++) {
						for (var j = 0; j < item.subjects[i].attendance.length; j++) {
							var tempObj = {
								Subject: item.subjects[i].subjectName,
								Date: item.subjects[i].attendance[j].date.substring(0, 10),
								Time: item.subjects[i].attendance[j].date.substring(10, 19),
								Attendance: item.subjects[i].attendance[j].attendance
							};
							tempData.push(tempObj);
						}
					}
					data.data = tempData;
					//data.dynamicColumns = true;
					data.width = 600;
					data.height = 300;
					data.studentId = item.studentId;
					data.totalAbsentPercentage = item.totalAbsentPercentage;
					data.totalPresentPercentage = item.totalPresentPercentage;
					data.showFilter = true;
					data.showFooter = false;
					data.updatable = false;
					data.deletable = false;
					data.details = true;
					data.dynamicColumns = true;
					let dialogRef = this.dialog.open(APopupComponent, {
						data: data
					});
				}
				else {
					this.dataService.getData(this.data.detailsUrl, temp).subscribe(results => {
						let data: any = {};
						data.emptyData = false;
						if (!results || results.code === -1 || !results.data) {
							data.emptyData = true;
							let dialogRef = this.dialog.open(APopupComponent, {
								data: data
							});
						}
						else if (results.data[0].subjects && this.dataService.user.selectedRole !== 'Admin') {
							var items = results.data[0];
							let data: any = {};
							data.callGrid = true;
							data.emptyData = false;
							var tempData = [];
							for (var i = 0; i < items.subjects.length; i++) {
								for (var j = 0; j < items.subjects[i].attendance.length; j++) {
									var tempObj = {
										Subject: items.subjects[i].subjectName,
										Date: items.subjects[i].attendance[j].date.substring(0, 10),
										Time: items.subjects[i].attendance[j].date.substring(10, 19),
										Attendance: items.subjects[i].attendance[j].attendance
									};
									tempData.push(tempObj);
								}
							}
							data.data = tempData;
							//data.dynamicColumns = true;
							data.width = 600;
							data.height = 300;
							data.studentId = item.studentId;
							data.totalAbsentPercentage = items.totalAbsentPercentage;
							data.totalPresentPercentage = items.totalPresentPercentage;
							data.showFilter = true;
							data.showFooter = false;
							data.updatable = false;
							data.deletable = false;
							data.details = true;
							data.dynamicColumns = true;
							let dialogRef = this.dialog.open(APopupComponent, {
								data: data
							});
						}
						else {
							var tempData = [];
							for (var i = 0; i < results.data.length; i++) {
								var tempObj1 = results.data[i];
								tempObj1.absentCount = tempObj1.absentCount[item.studentId];
								tempObj1.presentCount = tempObj1.presentCount[item.studentId];
								tempData.push(tempObj1);
							}
							data.data = tempData;
							data.callGrid = false;
							data.dynamicColumns = true;
							data.width = 920;
							data.height = 500;
							data.studentId = item.studentId;
							data.totalAbsentPercentage = results.data.totalAbsentPercentage;
							data.totalPresentPercentage = results.data.totalPresentPercentage;
							data.showFilter = false;
							data.showFooter = false;
							data.updatable = false;
							data.deletable = false;
							data.details = true;
							data.fields = [];
							// let dialogRef = this.dialog.open(APopupComponent, {
							// 	data: data
							// });
							// dialogRef.afterClosed().subscribe(result => {
							// 	//this.data = result;
							// 	//this.getServerData();
							// });

							this.attendance.emit(data);
						}
					})
				}
			}
		}
		else if (readOnly && !attendance) {
			this.dataService.getData(this.data.detailsUrl, temp).subscribe(results => {
				if (!results || results.code === -1) {
					return;
				}
				let data: any = {};
				data.data = results;
				data.width = 600;
				data.height = 300;
				data.showFilter = false;
				data.showFooter = false;
				data.updatable = false;
				data.deletable = false;
				data.details = true;
				let dialogRef = this.dialog.open(PopupComponent, {
					data: {
						details: true,
						fields: this.data.detailFields,
						data: item,
						gridFields: this.data.detailGridFields,
						gridData: data,
						name: this.selectedApp,
						button: 'Update',
						readOnly: readOnly ? readOnly : false
					}
				});
				dialogRef.afterClosed().subscribe(result => {
					//this.data = result;
					//this.getServerData();
				});
			})
		}
		else {
			var fields = this.data.addFields || this.fields;
			let dialogRef = this.dialog.open(PopupComponent, {
				data: {
					fields: this.dataService.getObjectsBy(fields, { update: true }),
					data: item,
					gridData: this.data,
					name: this.selectedApp,
					button: 'Update',
					readOnly: false,
					updateUrl: this.data.editUrl,
					moreProperties: this.data.additionalProperties
				}
			});
			dialogRef.afterClosed().subscribe((result) => {
				//this.data = result;
				//this.getServerData();
				if (result && result.update) {
					this.ondelete.emit('Updated');
				}
			});
		}
	}

	deleteItem(item) {
		var deleteField = this.dataService.getObjectBy(this.fields, { remove: true });
		if (this.data.deleteMethod) {
			this.dataService.deleteData(this.data.deleteUrl + item[deleteField.field]).subscribe(results => {
				this.ondelete.emit('Deleted');
				if (!results || results.code === -1) {
					this.snackBar.open('Problem With Deletion', 'Ok', {
						duration: 5000,
					});
					return;
				}
				this.ondelete.emit('Deleted');
			});
		} else {
			let temp = {};
			if (deleteField.deleteField)
				temp[deleteField.deleteField] = item[deleteField.field];
			else
				temp[deleteField.field] = item[deleteField.field];
			this.dataService.getData(this.data.deleteUrl, temp).subscribe(results => {
				if (!results || results.code === -1) {
					this.snackBar.open('Problem With Deletion', 'Ok', {
						duration: 5000,
					});
					return;
				}
				this.ondelete.emit('Deleted');
				// this.snackBar.open('Record Deleted Succesfully', 'Ok', {
				// 	duration: 5000,
				//   });
				// this.dataService.getData(this.data.url, this.data.objTemp).subscribe(results => {
				// 	if (!results) {
				// 	  return;
				// 	}
				// 	this.data = results.data;
				// });
			});
		}
	}

	printIdCard(item) {
		this.dataService.getData('admin/getStudentIdCard', { "studentId": item.studentId }).subscribe(results => {
			if (!results || results.code === -1) {
				//this.data.data = [];
			} else {
				var student = results.data;
				var invoice = '';
				invoice = '<center><table style="width:300px;height:500px;border:1px solid gray;border-radius: 7px"><tr style="border-bottom:1px solid blue"><td style="border-bottom: 1px dashed;"> <img src="assets/images/avanti-logo.jpg" style="width: 60px;height: 60px;margin-left: 20px;" /></td><td  style="border-bottom: 1px dashed;"><h2 style="margin:0">'+student.CollegeName+'</h2><h4  style="margin:0">'+student.Branch+'</h4></td></tr><tr><td colspan="2"> <center><img src="'+student.ProfilePic+'" style="width:100px;height:100px;border-radius:100px;border:5px solid gray" /></center></td></tr><tr><td colspan="2"><center><h3> <b>'+student.StudentName+'</b></h3><h4> <b>Student Id: '+student.StudentId+'</b></h4><h4> <b>Course: '+student.Course+'</b></h4><h4> <b>Department: '+student.Department+'</b></h4><h4> <b>Section: '+student.Section+'</b></h4></center></td></tr><tr><td colspan="2"class="pull-right"><h5 style="float:right" >Authorized Signature</h5></td></tr></table></center>';
				var myWindow = window.open("", "MsgWindow", "top=" + 30 + ",left=" + 30 + ",width=900,height=700");
				myWindow.document.write(invoice);
				setTimeout(() => {
					myWindow.print();
				}, 2000);
			}
		});
	}

	getResults(item) {
		var temp: any = {
			"year": this.data.objTemp.year || item.year,
			"semester": this.data.objTemp.semester || item.semester,
			"studentId": item.studentId,
			"businessId": this.data.objTemp.businessId,
		},
			url;
		if (this.data.url === "internals/getListOfInternalMarksPercentage") {
			temp.internalName = this.data.objTemp.internalName;
			url = 'internals/getInternalMarksResults';
		}
		else if (this.data.url === "external/getListOfExternalMarksPercentage") {
			temp.externalName = this.data.objTemp.externalName;
			url = 'external/getExternalMarksResults';
		}
		else if (this.data.url === "internals/getInternalMarksById") {
			temp.internalName = this.data.data[0].examName;
			temp.userName = this.dataService.user.userName;
			url = 'internals/getInternalMarksResultsForStudent';
		}
		else if (this.data.url === "external/getExternalMarksById") {
			temp.externalName = this.data.data[0].examName;
			temp.userName = this.dataService.user.userName;
			url = 'external/getExternalMarksResultsForStudent';
		}
		else if (this.data.url === 'internals/getInternalMarksResultsForParent') {
			temp.internalName = this.data.objTemp.internalName;
			url = 'internals/getInternalMarksResults';
		}
		else if (this.data.url === 'external/getExternalMarksResultsForParent') {
			temp.externalName = this.data.objTemp.externalName;
			url = 'external/getExternalMarksResults';
		}

		else if (this.data.url === "professor/getInternalResultsByProfessor") {
			temp.internalName = this.data.objTemp.internalName;
			url = 'internals/getInternalMarksResults';
		}
		else {
			temp.externalName = this.data.objTemp.externalName;
			url = "external/getExternalMarksResults";
		}
		this.dataService.getData(url, temp).subscribe(results => {
			if (!results || results.code === -1) {
				//this.data.data = [];
			} else {
				//this.data.data = results.data;
				//this.fields = [];
				var data: any = {
					studentId: item.studentId,
					studentName: item.firstName + ' ' + item.lastName,
					examName: item.internalName || item.externalName,
					results: item.resultType,
					subjects: Object.keys(results.data),
					marks: results.data
				}
				let dialogRef = this.dialog.open(RPopupComponent, {
					data: data
				});
			}
		});
	}

}