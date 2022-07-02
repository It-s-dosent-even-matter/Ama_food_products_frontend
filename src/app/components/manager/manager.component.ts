import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {Manager} from '../../models/manager.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ConfirmationComponent} from '../shared/dialogues/confirmation/confirmation.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit, AfterViewInit {

  @ViewChild('table', { read: MatTable }) table;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'nic', 'mobileNo', 'actions'];
  dataSource: MatTableDataSource<Manager>;
  managers: Manager[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
    ) {
  }

  public managerForm: FormGroup = new FormGroup({});

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.managers);
    this.initializeForm();
  }

  initializeForm() {
    this.managerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      nic: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit(fg: FormGroup) {
    const manager = new Manager();
    manager.firstName = fg.controls.firstName.value;
    manager.lastName = fg.controls.lastName.value;
    manager.email = fg.controls.email.value;
    manager.mobileNo = fg.controls.phoneNumber.value;
    manager.nic = fg.controls.nic.value;
    this.managers.push(manager);
    this.dataSource = new MatTableDataSource(this.managers);
    this.table.renderRows();
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Delete Confirmation',
        message: 'Do you Really want to delete?',
        type: 0,
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onUpdate() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Update Confirmation',
        message: 'Do you Really want to update?',
        type: 1,
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
