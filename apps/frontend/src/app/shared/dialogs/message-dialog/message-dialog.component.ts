import { Component, OnInit, Optional, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Subject } from 'rxjs';

import { DialogResult } from '../dialog-result.enum';
import { DialogType } from '../dialog-type.enum';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDialogComponent implements OnInit {
  dialogResult$ = new Subject<DialogResult>();
  message = '';
  options?: { htmlMessage: boolean };
  title!: string;
  type!: DialogType;
  types = DialogType;

  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private dialogData: any,
    public dialogRef: MatDialogRef<MessageDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.title = this.dialogData.title || '';
    this.message = this.dialogData.message || 'Mensaje de ejemplo';
    this.type = this.dialogData.type;
    this.options = this.dialogData.options;
  }

  onClick(value: 'accept' | 'cancel'): void {
    this.dialogResult$.next(value === 'accept' ? DialogResult.Ok : DialogResult.Cancel);
    this.dialogResult$.complete();
    this.dialogRef.close();
  }
}
