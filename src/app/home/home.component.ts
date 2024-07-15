import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subject, debounce, debounceTime, interval, map, startWith, takeUntil } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';
import { destination, origin } from './location.constants';
import { LocationService } from '../shared-service/location.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    AsyncPipe,
    MatAutocompleteModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [LocationService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  public today = new Date();
  public missingBaggageForm!: FormGroup;
  public originPlaces!: string[];
  private destinationPlace!: string[]
  public filteredOptions: Observable<string[]> | undefined;
  public filteredOptions2: Observable<string[]> | undefined;

  public amount: number | undefined;
  public total: number = 0;

  private destroy$ = new Subject();


  constructor(private fb: FormBuilder, public dialog: MatDialog, private service: LocationService, private route:Router) {

  }

  ngOnInit(): void {
    
    this.service.getOrigin().pipe(takeUntil(this.destroy$)).subscribe((item: any) => {
      this.originPlaces = item.data;
    })

    this.service.getDestination().pipe(takeUntil(this.destroy$)).subscribe((item: any) => {
      this.destinationPlace = item.data;
    })

    this.missingBaggageForm = this.fb.group({
      date: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      NoOfItemDetails: this.fb.array([]),
    });


    this.filteredOptions = this.missingBaggageForm.get('origin')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrigin(value || '')),
      debounceTime(500)
    );

    let intTime = 100;
    this.filteredOptions2 = this.missingBaggageForm.get('destination')?.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDestination(value || '')),
      debounce((res)=>{
        intTime+= 100;
        return interval(intTime)
      })
    );


    this.missingBaggageForm.get("NoOfItemDetails")?.valueChanges.subscribe(() => {
      this.total = this.NoOfItemDetails.value.reduce((acc:number, curr:any) => (acc + curr?.estimatedPrice), 0);     
    })

  }

  get NoOfItemDetails(): FormArray {
    return this.missingBaggageForm?.get('NoOfItemDetails') as FormArray;
  }

  private newItemsDetails(): FormGroup {
    return this.fb.group({
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      estimatedPrice: ['', Validators.required],
    });
  }

  public addNewItemsDetail(): void {
    const control = <FormArray>this.missingBaggageForm.controls['NoOfItemDetails'];
    control.push(this.newItemsDetails());
  }

  public removeItem(i: number): void {
    this.NoOfItemDetails.removeAt(i);
  }

  private _filterOrigin(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.originPlaces?.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterDestination(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.destinationPlace?.filter(option => option.toLowerCase().includes(filterValue));
  }

  public openDialog(): void {
    if (this.missingBaggageForm.valid && this.NoOfItemDetails.length > 0) {
      const dialogRef = this.dialog.open(ConfirmPopupComponent, {
        minWidth: "60vw",
        minHeight: "40vh",
        maxWidth: "6vw",
        maxHeight: "80vh",
        data: {
          mainform: this.missingBaggageForm.value,
          arrayForm: this.NoOfItemDetails.value
        }
      })
    }
    else {
      alert('Please add Missing Items')
    }

  }

  logout():void{
    localStorage.removeItem('userDetails');
    this.route.navigate(['/login'])
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
