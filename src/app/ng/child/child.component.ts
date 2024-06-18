import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit {

  @Input() updatedName: string = ''; //parent to child
  @Input() aquaName: string[] = [];  //parent to child
  name = 'data from Child to parent';
  @Output() updated = new EventEmitter<string>();

  constructor(
    private cd:ChangeDetectorRef
  ){

  }

  ngOnInit(): void {
    console.log(this.updatedName);
  }

  public btn2(): void {

    this.updated.emit(this.name);
  }

  refresh() {
    this.cd.detectChanges();
  }
  
  detectCheck():void{
    console.log('change detection in child');
    
  }
}
