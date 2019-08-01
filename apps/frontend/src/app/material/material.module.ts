import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatMenuModule,
  MatListModule,
  MatTableModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatProgressBarModule,
} from '@angular/material';

@NgModule({
  exports: [
    FlexLayoutModule,
    CdkTableModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
  ],
})
export class MaterialModule {}
