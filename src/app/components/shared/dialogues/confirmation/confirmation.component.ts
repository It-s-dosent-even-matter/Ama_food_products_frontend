import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  title = 'Are you sure you want to delete!';
  message = 'Hi hello there';
  type = 0; // 0 = delete, 1 = edit
  constructor(
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.message = data.message;
    this.type = data.type;
  }

  ngOnInit(): void {
  }

  onButtonAction(action: string) {
    this.dialogRef.close(action === 'yes');
  }

}
