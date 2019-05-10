import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { DataService } from './services/data.service';
import { TodoDataService } from './todo-data.service';
import { PopupComponent } from './components/popup/popup.component';
import { APopupComponent } from './components/attendance-popup/popup.component';
import { PPopupComponent } from './components/profile-popup/popup.component';
import { FPopupComponent } from './components/fee-popup/popup.component';
import { EPopupComponent } from './components/salary-popup/popup.component';
import { CPopupComponent } from './components/compose-popup/popup.component';
import { RPopupComponent } from './components/results-popup/popup.component';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';

// Import angular2-fusioncharts
import { FusionChartsModule } from 'angular2-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Import FusionCharts Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { FormComponent } from './components/form/form.component';
import { StudentsComponent } from './modules/admin/students/students.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ProfessorsComponent } from './modules/admin/professors/professors.component';
import { LibrarianComponent } from './modules/admin/librarian/librarian.component';
import { AttandanceComponent } from './modules/admin/attandance/attandance.component';
import { ResultsComponent } from './modules/admin/results/results.component';
import { FeedbackComponent } from './modules/admin/feedback/feedback.component';
import { DepartmentsComponent } from './modules/admin/departments/departments.component';
import { TransportComponent } from './modules/admin/transport/transport.component';
import { HostelComponent } from './modules/admin/hostel/hostel.component';
import { EmployeeComponent } from './modules/admin/employee/employee.component';
import { DetailsComponent } from './components/details/details.component';
import { StaffComponent } from './modules/admin/staff/staff.component';
import { SubjectsComponent } from './modules/admin/subjects/subjects.component';
import { LibraryComponent } from './modules/library/library/library.component';
import { DueBooksComponent } from './modules/library/due-books/due-books.component';
import { AcademicsComponent } from './modules/student/academics/academics.component';
import { StudentAttendanceComponent } from './modules/student/student-attendance/student-attendance.component';
import { FeePaymentComponent } from './modules/student/fee-payment/fee-payment.component';
import { MaintainFeedbackComponent } from './modules/student/maintain-feedback/maintain-feedback.component';
import { StudentDashboardComponent } from './modules/student/student-dashboard/student-dashboard.component';
import { CalendarWidgetComponent } from './modules/student/calendar-widget/calendar-widget.component';
//import {CalendarComponent} from "ap-angular2-fullcalendar";
import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";
import { FullCalendarModule } from 'ng-fullcalendar';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ParentDashboardComponent } from './modules/parent/parent-dashboard/parent-dashboard.component';
import { HostelsComponent } from './modules/hostel/hostels/hostels.component';
import { AllocationComponent } from './modules/hostel/allocation/allocation.component';
import { OutingPassComponent } from './modules/hostel/outing-pass/outing-pass.component';
import { BusesComponent } from './modules/transport/buses/buses.component';
import { DriversComponent } from './modules/transport/drivers/drivers.component';
import { BusDetailsComponent } from './modules/transport/bus-details/bus-details.component';
import { StopsComponent } from './modules/transport/stops/stops.component';
import { ManagementComponent } from './modules/transport/management/management.component';
import { BusAllocationsComponent } from './modules/transport/bus-allocations/bus-allocations.component';
import { ExpensesComponent } from './modules/transport/expenses/expenses.component';
import { ProfessorDashboardComponent } from './modules/professor/professor-dashboard/professor-dashboard.component';
import { ProfessorAcademicsComponent } from './modules/professor/professor-academics/professor-academics.component';
import { ProfessorExamsComponent } from './modules/professor/professor-exams/professor-exams.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProfessorResultsComponent } from './modules/professor/professor-results/professor-results.component';
import { RoutingModule } from './/routing.module';
import { CoursesComponent } from './modules/admin/courses/courses.component';
import { StudentFeedbackComponent } from './modules/professor/student-feedback/student-feedback.component';
import { ProfessorAttendanceComponent } from './modules/professor/professor-attendance/professor-attendance.component';
import { ParentAttendanceComponent } from './modules/parent/parent-attendance/parent-attendance.component';
import { ParentResultsComponent } from './modules/parent/parent-results/parent-results.component';
import { LendBooksComponent } from './modules/library/lend-books/lend-books.component';
import { ReturnBooksComponent } from './modules/library/return-books/return-books.component';
import { StudentResultsComponent } from './modules/student/student-results/student-results.component';
import { EmailComponent } from './modules/admin/email/email.component';
import { HolidaysComponent } from './modules/admin/holidays/holidays.component';
import { SchoolExpensesComponent } from './modules/accounts/school-expenses/school-expenses.component';
import { StoreExpensesComponent } from './modules/accounts/store-expenses/store-expenses.component';
import { StudentFeesComponent } from './modules/accounts/student-fees/student-fees.component';
import { EmployeeSalaryComponent } from './modules/accounts/employee-salary/employee-salary.component';
import { TotalSalaryComponent } from './modules/accounts/total-salary/total-salary.component';
import { CondonationComponent } from './modules/accounts/condonation/condonation.component';
import { AccountantsComponent } from './modules/admin/accountants/accountants.component';
import { LessonsComponent } from './modules/admin/lessons/lessons.component';
import { TopicsComponent } from './modules/admin/topics/topics.component';
import { LiveTrackingComponent } from './modules/admin/live-tracking/live-tracking.component';
import { AddBusTrackComponent } from './modules/transport/add-bus-track/add-bus-track.component';
import { AdminAttendanceComponent } from './modules/admin/admin-attendance/admin-attendance.component';
import { AdminAttendance1Component } from './modules/admin/admin-attendance1/admin-attendance1.component';
import { MenuComponent } from './modules/canteen/menu/menu.component';
import { CanteenFeedbackComponent } from './modules/canteen/canteen-feedback/canteen-feedback.component';
import { SalesReportComponent } from './modules/canteen/sales-report/sales-report.component';
import { CancelOrderComponent } from './modules/canteen/cancel-order/cancel-order.component';
import { CanteenExpensesComponent } from './modules/canteen/canteen-expenses/canteen-expenses.component';
import { SchoolsComponent } from './modules/super-admin/schools/schools.component';
import { CollegesComponent } from './modules/super-admin/colleges/colleges.component';
import { DirectorsComponent } from './modules/super-admin/directors/directors.component';
import { SuperAdminDashboardComponent } from './modules/super-admin/super-admin-dashboard/super-admin-dashboard.component';
import { CanteenOrdersComponent } from './modules/canteen/canteen-orders/canteen-orders.component';
import { EmployeeSalariesComponent } from './modules/accounts/employee-salaries/employee-salaries.component';
import { IdCardComponent } from './modules/admin/id-card/id-card.component';
import { SectionComponent } from "./modules/admin/section/section.component";
// import { ExaminationComponent } from "./modules/"
import { InfrastructureComponent } from "./modules/admin/infrastructure/infrastructure.component";
import { InfrastructuresComponent } from "./modules/accounts/infrastructures/infrastructures.component";
import { OtherExpensesComponent } from "./modules/accounts/other-expenses/other-expenses.component";
import { StudentFeeRecordComponent } from "./components/student-fee-record/student-fee-record.component";
import { CanteenComponent } from "./modules/admin/canteen/canteen.component";
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
	declarations: [
		AppComponent,
		SectionComponent,
		CanteenComponent,
		// ExaminationComponent,
		StudentFeeRecordComponent,
		InfrastructureComponent,
		InfrastructuresComponent,
		OtherExpensesComponent,
		ApplicationsListComponent,
		DataGridComponent,
		PopupComponent,
		APopupComponent,
		PPopupComponent,
		FPopupComponent,
		EPopupComponent,
		CPopupComponent,
		RPopupComponent,
		DashboardComponent,
		ChartComponent,
		TodoListComponent,
		FormComponent,
		StudentsComponent,
		ModalDialogComponent,
		ProfessorsComponent,
		LibrarianComponent,
		AttandanceComponent,
		ResultsComponent,
		FeedbackComponent,
		DepartmentsComponent,
		TransportComponent,
		HostelComponent,
		EmployeeComponent,
		DetailsComponent,
		StaffComponent,
		SubjectsComponent,
		LibraryComponent,
		DueBooksComponent,
		AcademicsComponent,
		StudentAttendanceComponent,
		FeePaymentComponent,
		MaintainFeedbackComponent,
		StudentDashboardComponent,
		CalendarWidgetComponent,
		StarRatingComponent,
		ParentDashboardComponent,
		HostelsComponent,
		AllocationComponent,
		OutingPassComponent,
		BusesComponent,
		DriversComponent,
		BusDetailsComponent,
		StopsComponent,
		ManagementComponent,
		BusAllocationsComponent,
		ExpensesComponent,
		ProfessorDashboardComponent,
		ProfessorAcademicsComponent,
		ProfessorExamsComponent,
		LoginComponent,
		MainComponent,
		ProfessorResultsComponent,
		CoursesComponent,
		StudentFeedbackComponent,
		ProfessorAttendanceComponent,
		ParentAttendanceComponent,
		ParentResultsComponent,
		LendBooksComponent,
		ReturnBooksComponent,
		StudentResultsComponent,
		EmailComponent,
		HolidaysComponent,
		SchoolExpensesComponent,
		StoreExpensesComponent,
		StudentFeesComponent,
		EmployeeSalaryComponent,
		TotalSalaryComponent,
		CondonationComponent,
		AccountantsComponent,
		LessonsComponent,
		TopicsComponent,
		LiveTrackingComponent,
		AddBusTrackComponent,
		AdminAttendanceComponent,
		AdminAttendance1Component,
		MenuComponent,
		CanteenFeedbackComponent,
		SalesReportComponent,
		CancelOrderComponent,
		CanteenExpensesComponent,
		SchoolsComponent,
		CollegesComponent,
		DirectorsComponent,
		SuperAdminDashboardComponent,
		CanteenOrdersComponent,
		EmployeeSalariesComponent,
		IdCardComponent
	],
	entryComponents: [PopupComponent,APopupComponent, DetailsComponent,PPopupComponent,StudentFeeRecordComponent,FPopupComponent,EPopupComponent,CPopupComponent,RPopupComponent],
	imports: [
		BrowserModule,
		MaterialModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpModule,
		HttpClientModule,
		FormsModule,
		FullCalendarModule,
		FusionChartsModule.forRoot(FusionCharts, Charts),
		RoutingModule,
	],
	providers: [DataService, TodoDataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
