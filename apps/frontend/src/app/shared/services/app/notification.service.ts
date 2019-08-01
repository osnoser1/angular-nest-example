import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';

import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { DialogResult, MessageDialogComponent, DialogType } from '@app/shared/dialogs';

@Injectable()
export class NotificationService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  showMessage(message: string, params?: { [K: string]: string | number }): void {
    this.snackBar.open(this.translate.instant(message, params), undefined, {
      duration: 3000,
    });
  }

  showConfirmDialog(
    title: string,
    message: string,
    options?: { htmlMessage: boolean },
  ): Observable<DialogResult> {
    const dialog = this.dialog.open(MessageDialogComponent, {
      data: { title, message, options, type: DialogType.Confirm },
    });
    return dialog.componentInstance.dialogResult$;
  }

  showCustomDialog<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    options?: any,
    backdropClass?: string,
    width?: string,
  ): MatDialogRef<T> {
    return this.dialog.open(componentOrTemplateRef, {
      data: options,
      disableClose: true,
      backdropClass,
      width,
    });
  }

  showMessageDialog(title: string, message: string): Observable<DialogResult> {
    const dialog = this.dialog.open(MessageDialogComponent, {
      data: { title, message, type: DialogType.Message },
      disableClose: true,
    });
    return dialog.componentInstance.dialogResult$;
  }
}
