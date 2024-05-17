import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent implements OnInit {
  public missingItem!: any[];
  public amount: number = 0;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public popupdata: any) {}
  
  ngOnInit(): void {
    this.missingItem = this.popupdata?.arrayForm;

    for (let i = 0; i < this.missingItem?.length; i++) {
      this.amount = this.amount + Number(this.missingItem[i].estimatedPrice);
    }
  }
}
