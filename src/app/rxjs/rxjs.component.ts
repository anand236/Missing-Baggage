import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription, asapScheduler, bindCallback, buffer, bufferCount, bufferTime, combineLatest, concatMap, defer, expand, from, fromEvent, generate, interval, map, mergeMap, of, pairwise, range, scan, switchMap, timer, window } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public text: FormControl | undefined;
  private textSearch: string = '';

  private subscription$: Subscription | undefined;

  // private subData = new Subject();
  // private subData = new ReplaySubject(2);
  private subData = new BehaviorSubject(0);


  constructor(
    private http: HttpClient
  ) {

  }

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

  firstTimer = timer(0, 5000);
  secondTimer = timer(500, 5000);
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
    this.combineTimers.subscribe((res) => {
      // console.log(res,'combineTimers');

    })



    // ======================================================Promise vs observables =====================

    // 1. both are asynchronous in nature
    // 2. promises are eager and observables are lazy untill subscrprion it will not trigger 
    // 3. we can get the result in promise using then() method and in observable by subscribe() method
    // 4. promises emits single value, observable emits multiple value
    // 5. we can manupulate the observables by using rxjs operator but not in promise
    // 6. we can cancel the subscription in observable but not in promise. y we need means if we r getting
    //    results based onn certain interval then in backgroung it will be emmiting the results all the time
    //    in order to stop that we unsuscribe ( it will destroy the once we move to other componet or routes)

    const promise = new Promise((resolve, reject) => {
      console.log('promise');

      setTimeout(() => {
        resolve('promise is working');
        resolve('promise is working2');
        resolve('promise is working3');
      }, 3000)
    });


    promise.then((res) => {
      console.log(res);
    })


    const observable = new Observable((result) => {
      console.log('observable');

      // setTimeout(() => {
      //   result.next('observable working');
      //   result.next('observable working2');
      //   result.next('observable working3');
      // }, 3000);

      let counter = 0;
      setInterval(() => {
        counter = counter + 1;
        result.next(counter)
      }, 1000)
    })

    // observable.pipe(map((res)=> res + ' map filter applied')).subscribe((res)=>{
    //   console.log(res); 
    // })

    this.subscription$ = observable.subscribe((res) => {
      // console.log(res);
    })

    // ========================================== Transformation Operators
    // buffer
    // Collects values from the past as an array, and emits that array only when another Observable emits.
    const click = fromEvent(document, 'click');
    const intervaldata = interval(1000);

    intervaldata.pipe(buffer(click)).subscribe((res) => {
      console.log(res);
    })

    // bufferCount
    //Collects values from the past as an array, and emits that array only when its size reaches bufferSize.

    intervaldata.pipe(bufferCount(5)).subscribe((res) => {
      console.log(res);
    })

    //bufferTime
    //Collects values from the past as an array, and emits those arrays periodically in time.

    intervaldata.pipe(bufferTime(5000)).subscribe((res) => {
      console.log(res);

    })


    // concatMap
    // Maps each value to an Observable, then flattens all of these inner Observables using concatAll.

    // map returns the valus but concatMap returns observable
    const concatArr = of(1, 2, 3, 4, 5);

    concatArr.pipe(concatMap((res: any) => {
      return of(res * 2) //returns observable
    })).subscribe((res) => {
      console.log(res);
    })


    //expand
    // The expand operator takes in a function as an argument which is applied on the 
    // source observable recursively and also on the output observable. The final value is an observable.

    of(2).pipe(expand((res) => of(res * 2))).subscribe((res) => {
      console.log(res);
    })

    const data = [1, 2, 3, 4, 5]
    //map
    from(data).pipe(map((res) => res * 2)).subscribe((res) => console.log(res, 'map'));

    //mergeMap
    //Maps each value to an Observable, then flattens all of these inner Observables using mergeAll.

    of(1, 2, 3, 4, 5).pipe(mergeMap(x => of(x, 'a').pipe(map((res) => res + 'hello')))).subscribe((res) => {
      console.log(res, 'm');
    })

    // pairwise
    // Puts the current value and previous value together as an array, and emits that.
    of(1, 2, 3, 4, 5, 6).pipe(pairwise()).subscribe((res) => {
      console.log(res, 'pairwise');
    })

    const spa = [1, 2, 3, 4, 5];

    const reduce = spa.reduce((acc, val) => acc + val, 0);

    console.log(reduce, 'reduce');

    //scan
    //It's like reduce, but emits the current accumulation state after each update

    of(1, 2, 3, 4, 5).pipe(scan((acc, val) => acc + val, 0)).subscribe((res) => {
      console.log(res, 'scan');

    })


    //  map - transform the shape of an emission
    // switchMap - subscribe to an observable and emit its emissions into the stream
    // The `switchMap` operator is used to switch to a new observable whenever a new value is emitted from the source observable.

    // Imagine you are implementing an autocomplete search feature in your Angular application. 
    // You want to send HTTP requests to fetch search results based on user input, but you only 
    // care about the results from the most recent request. `switchMap` is perfect for this scenario.

    this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(switchMap((textSearch: any) => {
      console.log(textSearch, 'text');

      return textSearch
    })).subscribe((res) => {
      console.log(res);

    });

    const time = timer(0, 1000);
    time.pipe(window(interval(5000))).subscribe((res) => {
      console.log(res, 'window');
    })



  }

  getInputData(event: any): void {
    console.log(event);

    this.textSearch = event
  }


  // ==================================================== Subject

  // in subject we will not get the initial value, bcz we get the first data has emmitted immediatley b4 v subscribe

  // ==================================================== Replay Subject
  //once all the data emmited and we click emit data again we will get the same data again 
  // replay subject will keep previous emmitted value in memory ( in replay sub we can specify how many no. 
  // to b emitted from memory) from last it will start if no.specified means

  // ==================================================== Behaviour Subject
  // in behaviour subjet it can store the initial value and once we subscribe we get the latest emmited value



  SunDataEmit(): void {

    this.subData.next(1);
    // console.log(1);


    setTimeout(() => {
      this.subData.next(2);
      // console.log(2);

    }, 3000);

    setTimeout(() => {
      this.subData.next(3);
      // console.log(3);

    }, 6000);

    setTimeout(() => {
      this.subData.next(4);
      // console.log(4);

    }, 9000);
  }

  getDataEmit() {
    this.subData.subscribe((res) => {
      console.log(res, 'sub');

    })
  }


  ngOnDestroy(): void {
    // it will destroy the once we move to other componet or routes
    this.subscription$?.unsubscribe();
  }



}
