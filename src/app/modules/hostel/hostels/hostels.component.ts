import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss']
})
export class HostelsComponent implements OnInit {
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
    let url = 'hostel/getHostelBuildingsByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'hostel/deleteHostelBuilding';
    this.data.editUrl = 'hostel/updateHostelBuilding';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['id','buildingName','noOfFloors','noOfRooms','noOfBeds','roomCapacity','totalBuildingCapacity'];
    this.fields = [
      {
        field: 'buildingId',
        label: 'Building Id',
        element: 'input',
        update: false,
        hide: true,
        editable: true
      },
      {
        field: 'id',
        label: 'id',
        element: 'input',
        hide: true,
        remove:true,
         update: true,
        editable: true
      },
      {
        field: 'buildingName',
        label: 'Building Name',
        element: 'input',
        hide: false,
        update: true,
        editable: true
      },
      {
        field: 'noOfFloors',
        label: 'No. Of Floors',
        element: 'input',
        hide: false,
        update: true,
        editable: false
      },
      {
        field: 'noOfRooms',
        label: 'No. Of Rooms',
        element: 'input',
        update: true,
        hide: false,
        editable: true
      },
      {
        field: 'noOfBeds',
        label: 'No. Of Beds',
        element: 'input',
        update: true,
        hide: false,
        editable: true
      },
      {
        field: 'roomCapacity',
        label: 'Room Capacity',
        element: 'input',
        update: true,
        hide: false,
        editable: true
      },
      {
        field: 'totalBuildingCapacity',
        label: 'Building Capacity',
        element: 'input',
        update: true,
        hide: false,
        editable: true
      },
      {
        field: 'businessId',
        label: 'Business Id',
        element: 'input',
        hide: true,
        editable: true
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ];
    
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
      this.data.data = results.data || [];
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      // "buildingId": student.buildingId,
      "buildingName": student.buildingName,
      "noOfFloors": student.noOfFloors,
      "noOfRooms": student.noOfRooms,
      "noOfBeds": student.noOfBeds,
      "roomCapacity": student.roomCapacity,
      "totalBuildingCapacity": student.totalBuildingCapacity,
      "businessId": this.dataService.user.businessId,
    }
    let url = "hostel/addHostelBuilding";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Hostel Building', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'hostel/getHostelBuildingsByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.newRecord = {};
        this.flip();
        this.data.data = results.data || [];
        this.snackBar.open('Hostel Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Hostel Record ' + flag + ' Succesfully', 'Ok', {
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
