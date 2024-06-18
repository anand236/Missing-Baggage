import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { asapScheduler, bindCallback, combineLatest, defer, from, fromEvent, generate, interval, map, of, range, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  // =================================CREATION OPERATORS===============================

  //creation operators are functions that can be used to create an 
  // Observable with some common predefined behavior or by joining other Observables.

  //1. interval
  observable = interval(1000);
  count: number | undefined;

  // 2. ajax => It creates an observable for an Ajax request with either a request object with url, headers, etc or a string for a URL
  ajax: any = ajax('https://jsonplaceholder.typicode.com/posts').subscribe((res) => {
    console.log(res, 'ajax');
    console.log(res.response, 'ajax');
  })

  //3. bindCallback => Converts a callback API to a function that returns an Observable;

  someFunction = (cb: any) => {
    cb()
  }

  //4. defer => Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.
  // it will give the updated observable

  deferObs$ = defer(() => {
    return of(new Date())
  })

  //5. of => Converts the arguments to an observable sequence.

  ofObs$ = of(1, 2, 3, 4, 5);

  //6.from => Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

  fromObs$ = from([1, 2, 3, 4, 5]);

  //7. fromEvent => Creates an Observable that emits events of a specific type coming from the given event target.
  clicks = fromEvent(document, 'click');

  //8. generate
  // Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
  result = generate(1, x => x < 3, x => x + 1);

  //9. range
  // Creates an Observable that emits a sequence of numbers within a specified range
  // Emits a sequence of numbers in a range
  rangeObs$ = range(1, 5);

  //10. timer => Creates an observable that will wait for a specified time period, or exact date, before emitting the number 0.
  timerObs$ = timer(4000);


  //================================== Join Creation Operators ===============================

  // These are Observable creation operators that also have join functionality -- emitting values of multiple source Observables.

  firstTimer = timer(0,5000);
  secondTimer = timer(500,5000);
  combineTimers = combineLatest([this.firstTimer, this.secondTimer]);
  





  ngOnInit(): void {
    this.observable.pipe(map((res) => (res * 2))).subscribe((res) => {
      this.count = res;
    });

    //3. bindCallback => Converts a callback API to a function that returns an Observable;
    const boundFunction = bindCallback(this.someFunction);
    boundFunction().subscribe(() => {
      console.log('i was sync');
    })

    const boundFunction2 = bindCallback(this.someFunction, asapScheduler);
    boundFunction2().subscribe(() => {
      console.log('i was async');
    })
    console.log('hi');

    //4. defer => Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.
    // it will give the updated observable

    this.deferObs$.subscribe((res) => {
      console.log(res.toTimeString(), 'defer');
    })

    setTimeout(() => {
      this.deferObs$.subscribe((res) => {
        console.log(res.toTimeString(), 'defer');
      })
    }, 5000)

    //5. of => Converts the arguments to an observable sequence.
    this.ofObs$.subscribe((res) => {
      console.log(res, 'of');
    })

    //6.from => Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

    this.fromObs$.subscribe((res) => {
      console.log(res, 'from');

    })

    //7. fromEvent => Creates an Observable that emits events of a specific type coming from the given event target.
    this.clicks.subscribe(x => console.log(x, 'fromEvent'));

    //8. generate
    // Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
    this.result.subscribe(x => console.log(x, 'generate'));

    //9. range
    // Creates an Observable that emits a sequence of numbers within a specified range
    this.rangeObs$.subscribe((res) => {
      console.log(res, 'range');
    })

    //10. timer => Creates an observable that will wait for a specified time period, or exact date, before emitting the number 0.
    this.timerObs$.subscribe(() => {
      console.log('timer operator called after 4 sec');

    })

    //================================== Join Creation Operators ===============================
    // These are Observable creation operators that also have join functionality -- emitting values of multiple source Observables.
    this.combineTimers.subscribe((res)=>{
      console.log(res,'combineTimers');
      
    })
    


  }




}
