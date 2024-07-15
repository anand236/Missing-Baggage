import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
  asapScheduler,
  audit,
  auditTime,
  bindCallback,
  buffer,
  bufferCount,
  bufferTime,
  combineLatest,
  combineLatestAll,
  concatAll,
  concatMap,
  count,
  debounce,
  defer,
  delay,
  delayWhen,
  dematerialize,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  elementAt,
  every,
  expand,
  filter,
  find,
  findIndex,
  first,
  from,
  fromEvent,
  generate,
  interval,
  isEmpty,
  last,
  map,
  materialize,
  max,
  mergeAll,
  mergeMap,
  min,
  observeOn,
  of,
  pairwise,
  range,
  sample,
  sampleTime,
  scan,
  single,
  skip,
  skipLast,
  skipUntil,
  startWith,
  subscribeOn,
  switchAll,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap,
  timeInterval,
  timeout,
  timer,
  timestamp,
  toArray,
  window,
  withLatestFrom,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss'],
})
export class RxjsComponent implements OnInit, OnDestroy {
  public text: FormControl | undefined;
  private textSearch: string = '';

  private subscription$: Subscription | undefined;

  // private subData = new Subject();
  // private subData = new ReplaySubject(2);
  private subData = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  // =================================CREATION OPERATORS===============================

  //creation operators are functions that can be used to create an
  // Observable with some common predefined behavior or by joining other Observables.

  //1. interval
  observable = interval(1000);
  count: number | undefined;

  // 2. ajax => It creates an observable for an Ajax request with either a request object with url, headers, etc or a string for a URL
  ajax: any = ajax('https://jsonplaceholder.typicode.com/posts').subscribe(
    (res) => {
      console.log(res, 'ajax');
      console.log(res.response, 'ajax');
    }
  );

  //3. bindCallback => Converts a callback API to a function that returns an Observable;

  someFunction = (cb: any) => {
    cb();
  };

  //4. defer => Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.
  // it will give the updated observable

  deferObs$ = defer(() => {
    return of(new Date());
  });

  //5. of => Converts the arguments to an observable sequence.

  ofObs$ = of(1, 2, 3, 4, 5);

  //6.from => Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

  fromObs$ = from([1, 2, 3, 4, 5]);

  //7. fromEvent => Creates an Observable that emits events of a specific type coming from the given event target.
  clicks = fromEvent(document, 'click');

  //8. generate
  // Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
  result = generate(
    1,
    (x) => x < 3,
    (x) => x + 1
  );

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
    this.observable.pipe(map((res) => res * 2)).subscribe((res) => {
      this.count = res;
    });

    //3. bindCallback => Converts a callback API to a function that returns an Observable;
    const boundFunction = bindCallback(this.someFunction);
    boundFunction().subscribe(() => {
      console.log('i was sync');
    });

    const boundFunction2 = bindCallback(this.someFunction, asapScheduler);
    boundFunction2().subscribe(() => {
      console.log('i was async');
    });
    console.log('hi');

    //4. defer => Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.
    // it will give the updated observable

    this.deferObs$.subscribe((res) => {
      console.log(res.toTimeString(), 'defer');
    });

    setTimeout(() => {
      this.deferObs$.subscribe((res) => {
        console.log(res.toTimeString(), 'defer');
      });
    }, 5000);

    //5. of => Converts the arguments to an observable sequence.
    this.ofObs$.subscribe((res) => {
      console.log(res, 'of');
    });

    //6.from => Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

    this.fromObs$.subscribe((res) => {
      console.log(res, 'from');
    });

    //7. fromEvent => Creates an Observable that emits events of a specific type coming from the given event target.
    this.clicks.subscribe((x) => console.log(x, 'fromEvent'));

    //8. generate
    // Generates an observable sequence by running a state-driven loop producing the sequence's elements, using the specified scheduler to send out observer messages.
    this.result.subscribe((x) => console.log(x, 'generate'));

    //9. range
    // Creates an Observable that emits a sequence of numbers within a specified range
    this.rangeObs$.subscribe((res) => {
      console.log(res, 'range');
    });

    //10. timer => Creates an observable that will wait for a specified time period, or exact date, before emitting the number 0.
    this.timerObs$.subscribe(() => {
      console.log('timer operator called after 4 sec');
    });

    //================================== Join Creation Operators ===============================
    // These are Observable creation operators that also have join functionality -- emitting values of multiple source Observables.
    this.combineTimers.subscribe((res) => {
      // console.log(res,'combineTimers');
    });

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
      }, 3000);
    });

    promise.then((res) => {
      console.log(res);
    });

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
        result.next(counter);
      }, 1000);
    });

    // observable.pipe(map((res)=> res + ' map filter applied')).subscribe((res)=>{
    //   console.log(res);
    // })

    this.subscription$ = observable.subscribe((res) => {
      // console.log(res);
    });

    // ========================================== Transformation Operators
    // buffer
    // Collects values from the past as an array, and emits that array only when another Observable emits.
    const click = fromEvent(document, 'click');
    const intervaldata = interval(1000);

    intervaldata.pipe(buffer(click)).subscribe((res) => {
      console.log(res, 'buffer');
    });

    // bufferCount
    //Collects values from the past as an array, and emits that array only when its size reaches bufferSize.

    intervaldata.pipe(bufferCount(5)).subscribe((res) => {
      console.log(res, 'bufferCount');
    });

    //bufferTime
    //Collects values from the past as an array, and emits those arrays periodically in time.

    intervaldata.pipe(bufferTime(5000)).subscribe((res) => {
      console.log(res);
    });

    // concatMap
    // Maps each value to an Observable, then flattens all of these inner Observables using concatAll.

    // map returns the valus but concatMap returns observable
    const concatArr = of(1, 2, 3, 4, 5);

    concatArr
      .pipe(
        concatMap((res: any) => {
          return of(res * 2); //returns observable
        })
      )
      .subscribe((res) => {
        console.log(res);
      });

    //expand
    // The expand operator takes in a function as an argument which is applied on the
    // source observable recursively and also on the output observable. The final value is an observable.

    of(2)
      .pipe(expand((res) => of(res * 2)))
      .subscribe((res) => {
        // console.log(res, 'expand');
      });

    const data = [1, 2, 3, 4, 5];
    //map
    from(data)
      .pipe(map((res) => res * 2))
      .subscribe((res) => console.log(res, 'map'));

    //mergeMap
    //Maps each value to an Observable, then flattens all of these inner Observables using mergeAll.

    of(1, 2, 3, 4, 5)
      .pipe(mergeMap((x) => of(x, 'a').pipe(map((res) => res + 'hello'))))
      .subscribe((res) => {
        console.log(res, 'm');
      });

    // pairwise
    // Puts the current value and previous value together as an array, and emits that.
    of(1, 2, 3, 4, 5, 6)
      .pipe(pairwise())
      .subscribe((res) => {
        console.log(res, 'pairwise');
      });

    const spa = [1, 2, 3, 4, 5];

    const reduce = spa.reduce((acc, val) => acc + val, 0);

    console.log(reduce, 'reduce');

    //scan
    //It's like reduce, but emits the current accumulation state after each update

    of(1, 2, 3, 4, 5)
      .pipe(scan((acc, val) => acc + val, 0))
      .subscribe((res) => {
        console.log(res, 'scan');
      });

    //  map - transform the shape of an emission
    // switchMap - subscribe to an observable and emit its emissions into the stream
    // The `switchMap` operator is used to switch to a new observable whenever a new value is emitted from the source observable.

    // Imagine you are implementing an autocomplete search feature in your Angular application.
    // You want to send HTTP requests to fetch search results based on user input, but you only
    // care about the results from the most recent request. `switchMap` is perfect for this scenario.

    this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        switchMap((textSearch: any) => {
          console.log(textSearch, 'text');

          return textSearch;
        })
      )
      .subscribe((res) => {
        console.log(res);
      });

    const time = timer(0, 1000);
    time.pipe(window(interval(5000))).subscribe((res) => {
      console.log(res, 'window');
    });

    // =========================================================Filtering Operator

    // audit
    //Ignores source values for a duration determined by another Observable,
    // then emits the most recent value from the source Observable, then repeats this process.

    // after certain interval it will emit observable
    interval(1000)
      .pipe(audit(() => interval(10000)))
      .subscribe((res) => {
        console.log(res, 'audit');
      });

    //auditTime
    // its similar to audit but it will take exact time duraction in millisecond
    interval(1000)
      .pipe(auditTime(5000))
      .subscribe((res) => {
        console.log(res, 'audit time');
      });

    //take
    //Takes the first count values from the source, then completes

    interval(1000)
      .pipe(take(5))
      .subscribe((res) => {
        console.log(res, 'takes upto length 5');
      });

    //takeLast
    //Waits for the source to complete, then emits the last N values from the source, as specified by the count argument
    of(1, 2, 3, 4, 5)
      .pipe(takeLast(2))
      .subscribe((res) => console.log(res, 'takeLast'));

    //filter
    //t allows you to selectively emit values from an observable based on some condition.
    interval(1000)
      .pipe(filter((res) => res > 5))
      .subscribe((res) => {
        console.log(res, 'filters emits above 5 only');
      });

    //debounceTime
    // it will emit the values based on the fixed intervals (milliseconds)

    //debounce
    // it will emit the values dynamically intervals (milliseconds) ex: autocomplete

    //distinct
    //Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from all previous items.

    of(1, 1, 1, 2, 1, 3, 5, 7, 4, 5, 8, 4, 6, 6, 10)
      .pipe(distinct())
      .subscribe((res) => console.log(res, 'distinct'));

    //distinctUntilChanged
    //Note that 1 is emitted more than once, because it's distinct in comparison to the previously emitted value, not in comparison to all other emitted values.
    of(1, 1, 1, 2, 1, 3, 5, 7, 4, 5, 8, 4, 6, 6, 10)
      .pipe(distinctUntilChanged())
      .subscribe((res) => console.log(res, 'distinctUntilChanged'));

    //distinctUntilKeyChanged
    //Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item, using a property accessed by using the key provided to check if the two items are distinct

    of(
      { age: 1, name: 'Foo' },
      { age: 1, name: 'Bar' },
      { age: 2, name: 'Foo' },
      { age: 3, name: 'Foo' }
    )
      .pipe(distinctUntilKeyChanged('age'))
      .subscribe((res) => {
        console.log(res, 'distinctUntilKeyChanged');
      });

    //elementAt
    // it takes number as an argument and returns the value at that index
    of(1, 2, 3, 4, 5)
      .pipe(elementAt(2))
      .subscribe((res) => console.log(res, 'elemt '));

    //filter
    of(1, 2, 3, 4, 5)
      .pipe(filter((res) => res > 2))
      .subscribe((res) => console.log(res, 'filter '));

    //first and last
    of(1, 2, 3, 4, 5)
      .pipe(first())
      .subscribe((res) => console.log(res, 'first '));
    of(1, 2, 3, 4, 5)
      .pipe(last())
      .subscribe((res) => console.log(res, 'last '));

    //sampleTime emits at certain period of time
    interval(1000)
      .pipe(sampleTime(4000))
      .subscribe((res) => console.log(res, 'sampleTime'));

    //single
    //Emit first number passing predicate
    of(1, 2, 3, 4, 5)
      .pipe(single((res) => res == 1))
      .subscribe((res) => console.log(res, 'single '));

    //skip
    //skips the value b4 emission as per mentioned legnth passed as argument
    of(1, 2, 3, 4, 5)
      .pipe(skip(2))
      .subscribe((res) => console.log(res, 'skip '));
    of(1, 2, 3, 4, 5)
      .pipe(skipLast(2))
      .subscribe((res) => console.log(res, 'skip last'));

    //skipUntill
    // Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
    let skipInterval = interval(1000);
    let skipClick = fromEvent(document, 'click');

    // skipInterval.pipe(skipUntil(skipClick)).subscribe((res)=> console.log(res,'skipUntill click'));

    //takeUntil
    // Tick every second until the first click happens
    skipInterval
      .pipe(takeUntil(skipClick))
      .subscribe((res) => console.log(res, 'takeUntill click'));

    // ===================================================JOIN creation operators

    //combineLatest
    // it takes the latest values from the 2 differnect observable combines it and emits res

    let src1 = new Observable((res) => {
      setTimeout(() => {
        res.next(1);
      }, 1000);
    });

    let src2 = new Observable((res) => {
      setTimeout(() => {
        res.next(10);
      }, 5000);
    });

    combineLatest([src1, src2]).subscribe((res) =>
      console.log(res, 'combineLatest')
    );

    //combineLatestAll
    // combine by taking the latest emiited adata and creates an array
    of(1, 2, 3)
      .pipe(
        map(() => {
          return interval(1000);
        }),
        combineLatestAll()
      )
      .subscribe((res) => {
        console.log(res, 'combineLatestAll');
      });


    //concatAll
    //Joins every Observable emitted by the source (a higher-order Observable), in a serial fashion..
    //It subscribes to each inner Observable only after the previous inner Observable has completed, 
    //and merges all of their values into the returned observable.
    of(2, 4).pipe(map((val) => interval(1000).pipe(take(val))), concatAll()).subscribe((res) => console.log(res, 'concatAll'));

    //mergeAll
    //Flattens an Observable-of-Observables.


    of(5,2).pipe(map((val)=> interval(1000).pipe(take(val)))).pipe(mergeAll()).subscribe((res)=>{
      console.log(res,'mergeAll');      
    })

    //swithAll
    //Converts a higher-order Observable into a first-order Observable producing values only from the most recent observable sequence

    of(5,3,6).pipe(map((val)=> interval(1000).pipe(take(2)))).pipe(switchAll()).subscribe((res)=>console.log(res,'switchAll'));

    //startWith()
    //First emits its arguments in order, and then any emissions from the source.

    of(1,2,3,4,5).pipe(startWith(0)).subscribe((res)=>console.log(res,'startWith'));

    //withLatestFrom()
    //Whenever the source Observable emits a value, it computes a formula using that value plus the latest values from other input Observables, then emits the output of that formula.

    let clickd = fromEvent(document,'click');
    
    clickd.pipe(withLatestFrom(interval(1000))).subscribe((res)=>{
      console.log(res,'withLatestFrom');
    })


    //=================================================Utility operator

    //tap
    //helpful for debugging

    interval(1000).pipe(take(3),tap((res)=>{
      //even if u alter the res the output will be same as input 
      //its helpful in comparing the updated and old values
      res*2
      console.log(res,'tap')
    }
    )).subscribe();


    //delay
    //Time shifts each item by some specified amount of milliseconds.

    interval(1000).pipe(delay(5000)).subscribe((res)=>{
      //it will not start immediately after 5 sec delay it will emit output
      console.log(res,'delay');
      
    });


    //delayWhen
    of(1,2,3,4,5).pipe(delayWhen(()=> clickd)).subscribe((res)=>{
      console.log(res,'delayWhen');
      
    })

    //materialize()
    // each value is converted into notification object kind: N etc
    const letters = of('a', 'b', 13, 'd');
    const upperCase = letters.pipe(map((x: any) => x.toUpperCase()));
    const materialized = upperCase.pipe(materialize());
    
    materialized.subscribe(x => console.log(x));


    //subscribeOn
    //asynchronous call

    console.log('start');

    // of(1,2,3,4,5).subscribe((res)=>{
    //   console.log(res,'subscribed');
    // })

    //if i use subscribeOn
    of(1,2,3,4,5).pipe(map((res)=> {
      console.log('map');
     return res*10
    }),observeOn(asapScheduler)).subscribe((res)=>{
      console.log(res,'subscribed');
    })
    console.log('end');

    //timeInterval()
    // it shows ho mmuch time t took for emission 
    interval(1000).pipe(timeInterval()).subscribe((res)=>{
      // console.log(res,'timeInterval');
    })

    //timestamp()
    // it shows ho mmuch time in timestamp took for emission 
    interval(1000).pipe(timestamp()).subscribe((res)=>{
      // console.log(res,'timestamp');
    })

     //timestamp()
    // it shows ho mmuch time in timestamp took for emission 
    interval(1000).pipe(timeout(5)).subscribe((res)=>{
      console.log(res,'timeout');
    })

    //toArray

    interval(1000).pipe(take(5), toArray()).subscribe((res)=>{
      console.log(res,'toarray');
    })

    //======================================Conditional operator

    //every
    of(1,2,3,4,5).pipe(every((res)=> res > 3)).subscribe((res)=>{
      console.log(res,'every');
    });

    //find
    of(1,2,3,4,5).pipe(find((res)=> res > 3)).subscribe((res)=>{
      console.log(res,'find');
    });

    //isEmpty()
    of(1,2,3,4,5).pipe(isEmpty()).subscribe((res)=>{
      console.log(res,'isEmpty');
    });

    //findIndex()
    of(1,2,3,4,5).pipe(findIndex((res)=> res % 5 ===0)).subscribe((res)=>{
      console.log(res,'findIndex');
    });

    //max
    of(1,2,3,4,5).pipe(max()).subscribe((res)=>{
      console.log(res,'max');
    });

    //min
    of(1,2,-3,4,5).pipe(min()).subscribe((res)=>{
    console.log(res,'min');
    });

    //count
    of(1,2,-3,4,5).pipe(count()).subscribe((res)=>{
      console.log(res,'count');
      });

    

    
    
    




  }

  getInputData(event: any): void {
    console.log(event);

    this.textSearch = event;
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
    });
  }

  ngOnDestroy(): void {
    // it will destroy the once we move to other componet or routes
    this.subscription$?.unsubscribe();
  }
}
