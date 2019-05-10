import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss']
})
export class AcademicsComponent implements OnInit {
  tile: any = {};
  selected: any;
  lists: any;
  subjects: any;
  selectedS: any;
  subject: any = {};
  chapterDetails: any;
  selectedC: any;
  syllabus: any;
  assignments: any;
  results: any ={};
  data: any;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getData();
    this.subjects = ["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5", "Subject 6", "Subject 7", "Subject 8"];
    this.lists = ['1st Year - 1', '1st Year - 2', '2nd Year - 1', '2nd Year - 2', '3rd Year - 1', '3rd Year - 2', '4th Year - 1', '4th Year - 2'];
    this.selected = this.lists[0];
    this.selectedS = this.subjects[0];
    this.subject.syllabus = {
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10", "Chapter 11", "Chapter 12", "Chapter 13", "Chapter 14"],
      "Chapter 1": { syllabus: "Details about chapter 1", assignments: "Assignments on chapter 1", results: 'chapter 1 results' },
      "Chapter 2": { syllabus: "Details about chapter 2", assignments: "Assignments on chapter 2", results: 'chapter 2 results' },
      "Chapter 3": { syllabus: "Details about chapter 3", assignments: "Assignments on chapter 3", results: 'chapter 3 results' },
      "Chapter 4": { syllabus: "Details about chapter 4", assignments: "Assignments on chapter 4", results: 'chapter 4 results' },
      "Chapter 5": { syllabus: "Details about chapter 5", assignments: "Assignments on chapter 5", results: 'chapter 5 results' },
      "Chapter 6": { syllabus: "Details about chapter 6", assignments: "Assignments on chapter 6", results: 'chapter 6 results' },
      "Chapter 7": { syllabus: "Details about chapter 7", assignments: "Assignments on chapter 7", results: 'chapter 7 results' },
      "Chapter 8": { syllabus: "Details about chapter 8", assignments: "Assignments on chapter 8", results: 'chapter 8 results' },
      "Chapter 9": { syllabus: "Details about chapter 9", assignments: "Assignments on chapter 9", results: 'chapter 9 results' },
      "Chapter 10": { syllabus: "Details about chapter 10", assignments: "Assignments on chapter 10", results: 'chapter 10 results' },
      "Chapter 11": { syllabus: "Details about chapter 11", assignments: "Assignments on chapter 11", results: 'chapter 11 results' },
      "Chapter 12": { syllabus: "Details about chapter 12", assignments: "Assignments on chapter 12", results: 'chapter 12 results' },
      "Chapter 13": { syllabus: "Details about chapter 13", assignments: "Assignments on chapter 13", results: 'chapter 13 results' },
      "Chapter 14": { syllabus: "Details about chapter 14", assignments: "Assignments on chapter 14", results: 'chapter 14 results' }
    };
    this.chapterDetails = this.subject.syllabus[this.subject.syllabus.chapters[0]];
  }
  getData() {
    let syllabusUrl = 'student/viewSyllabus',
      objTemp = {
        "department": this.dataService.user.department,
        "course": this.dataService.user.course,
        "year": this.dataService.user.year,
        "semester": this.dataService.user.semester,
        "businessId": this.dataService.user.businessId
      }
    this.dataService.getData(syllabusUrl, objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.syllabus = [];
        return;
      }
      this.syllabus = results.data;
    });
    let external = 'student/viewExternalResults',
      allExternal = 'external/getExternalMarksById',
      allInternal = 'student/viewInternalResults',
      internal = 'internals/getInternalMarksById',
      temp = {
        "studentId": this.dataService.user.businessId
      }
    this.dataService.getData(external, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.results.external = [];
        return;
      }
      this.results.external = results.data;
      // this.callGrid = true;
    });
    this.dataService.getData(allExternal, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.results.allExternal = [];
        return;
      }
      this.results.allExternal = results.data;
      // this.callGrid = true;
    });
    this.dataService.getData(allInternal, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.results.allInternal = [];
        return;
      }
      this.results.allInternal = results.data;
      // this.callGrid = true;
    });
    this.dataService.getData(internal, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.results.internal = [];
        return;
      }
      this.results.internal = results.data;
      // this.callGrid = true;
    });
  }
  ngAfterContentChecked() {
    let padding = 60,
      height = ($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop),
      width = $('.mat-grid-tile')[0].offsetWidth;
    this.tile.rowHeight = height + 'px';
    this.subjects.tableHeight = $('.nav-list')[0].offsetTop - $('.mat-tab-body-wrapper')[0].offsetTop - 80;
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
}
