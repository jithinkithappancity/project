import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <div class="icon-container">
        <mat-icon color="primary" class="icon">check_circle</mat-icon>
      </div>
      <h2 mat-dialog-title class="dialog-title">Success</h2>
      <mat-dialog-content class="dialog-content" style="color: white;">
        <p>{{ data.message }}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-flat-button color="primary" mat-dialog-close>OK</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 16px;
      text-align: center;
    }
    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon {
      font-size: 48px;
    }
    .dialog-title {
      font-weight: 600;
      margin-top: 8px;
      color: #2e7d32;
    }
    .dialog-content {
      font-size: 16px;
      margin: 12px 0;
    }
    mat-dialog-actions {
      justify-content: center;
    }
    button {
      min-width: 80px;
    }
  `]
})
export class MessageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
