import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../shared-service/shared.service';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ng',
  standalone: true,
  imports: [CommonModule, FormsModule, ChildComponent, RouterModule, HttpClientModule],
  providers:[SharedService],
  templateUrl: './ng.component.html',
  styleUrls: ['./ng.component.scss'],
})
export class NgComponent implements OnInit {
  public interpolation: string = 'interpolation test';
  public property: string = 'property binding';
  public name: string = 'Anand Choudhary';
  public ternary: boolean = true;

  public day = (new Date()).getDay();
  public data:string[] = ['Sunday', 'Monday'];
  public aquaticCreatures = ['shark', 'dolphin', 'octopus'];
  public counter:number = 0;

  public data$ = interval(1000);

  @Input() updatedName?: string;

  unsubscribe$ = new Subject<void>();

  constructor(
    private http:HttpClientModule,
    private sharedSer:SharedService
  ){

  }

  ngOnInit(): void {
    console.log(this.updatedName);
    console.log((new Date()).getDay);

    this.sharedSer.getData().pipe(takeUntil(this.unsubscribe$)).subscribe((res)=>{
      console.table(res);
    })
    
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getDynamicValue(): string {
    return 'Dynamic Value';
  }

  public btn(): void {
    alert('Event Binding');
  }

  //@output decorator
  updatedNamed(e:string){
    console.log(e);
    
  }

  updateAqua(event:string){
    this.aquaticCreatures.push(event) 
    // this.aquaticCreatures = [...this.aquaticCreatures, event];
  }
  Increment(){
    this.counter++;
  }
}
