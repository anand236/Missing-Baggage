import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
})
export class PracticeComponent implements OnInit {
  private age!: number;
  private glob = 5;

  constructor() {}

  ngOnInit(): void {
    // for
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }

    // while

    let j = 0;
    while (j < 10) {
      console.log(j);
      j++;
    }

    // do while

    let k = 0;
    do {
      console.log(k);
      k += 1;
    } while (k < 10);

    console.log(this.ageNumber(1995));
    console.log(this.ageNumber(1967));

    outer();

    function outer() {
      let a = 1;

      console.log(a);

      function inner() {
        let b = 2;
        console.log(a + b);
      }

      inner();
    }

    this.check();

    this, this.makeAdder(1);

    //  closures

    let c = this.closure();

    c();

    this.closure2();

    // =========================ES14 new features

    let arr = [3, 5, 2, 1, 4];
    console.log(arr.sort());

    //====================================================================typescript

    let graph: [x: number, y: number] = [55.2, 41.3];
    let [x, y] = graph;

    console.log(x, y);

    const graph1: [number, number] = [55.2, 41.3];
    const [x1, y1] = graph1;

    let book: { name: string; price: number; read: boolean } = {
      name: 'ydkjs',
      price: 2500,
      read: true,
    };

    console.log(book);


    let type:{type:string, read?:boolean} = {
      type:'typescript'
    }

    //Property 'read' is missing in type '{ type: string; }' but required in type '{ type: string; read: boolean; }

    enum direstion{
      east,west,north,south
    }

    console.log(direstion.east);

    interface Box{
      width:number,
      height:number
    };

    let boxObj:Box = {
      width:10,
      height:50
    }

    interface colorBox extends Box{
      color:string
    }

    let colouredBox:colorBox = {
      width:10,
      height:50,
      color:'red'
    }

    let booxed1: (string | boolean) = true;
    let booxed2: (string | boolean) = 'true';
    // let booxed3: (string | boolean) = 50; //Type '50' is not assignable to type 'string | boolean';
    
    let added = this.add(4,5);
    let named = this.sayName('Anand','Choudhary');
    console.log(added);
    console.log(named);

    let cast:unknown = 'Casted';

    console.log((cast as string).length);
    console.log((<string>cast).length);


    //========================classes
    class Names{
      private name:string;
      constructor(name:string){
          this.name = name;
      }

      public getName():string{
        return this.name;
      }
    }

    let per = new Names('anand');
    
    console.log(per.getName());
    
    // ============================================ utility types

    // 1. partial
    interface name{
      fName:string,
      lName:string
    }

    let Name :name = {fName:'anand',lName:'choudhary'};
    let Name2 :Partial<name> = {}; // it will consider property as optional
    
    //2.Required

    interface Name3{
      fName:string,
      lName:string,
      age?:number
    }

    let name3:Name3 = {fName:'a', lName:'b'}; // no error for optioanl
    let name4: Required<Name3> = {fName:'a', lName:'b',age:2};  //Property 'age' is missing in type

    interface Name4{
      fName:string,
      lName:string,
      age?:number
    }

    let name5:Readonly<Name4> = {
      fName:'a',
      lName:'string'
    }

    // name5.fName = 'Anand' //Cannot assign to 'fName' because it is a read-only property
    
  }

  add(a:number,b:number): number{
    return a+b
  }

  sayName(fName:string, lName:string): string{
    return `hello ${fName} ${lName}`
  }

  private ageNumber = (yearBorn: number) => {
    return `your age is ${2024 - yearBorn}`;
  };

  private check() {
    let a = 5;

    console.log(this.glob);

    this.insideCheck();
  }

  insideCheck() {
    let b = 10;
    console.log(this.glob);
  }

  btn() {
    // console.log(e);
    // if(e){
    //   this.checked
    // }
  }

  // checked = (function(){
  //   alert('hi')
  // })()

  // checked2 = (()=>{
  //   alert('arrow')
  // })();

  makeAdder(x: any) {
    // parameter `x` is an inner variable
    // inner function `add()` uses `x`, so
    // it has a "closure" over it
    function add(y: any) {
      return y + x;
    }
    console.log(add);

    return add;
  }

  closure() {
    let msg = 'gud morning';
    console.log('hello ' + msg);

    {
      let msg = 'gud afternoon';
      console.log('hello ' + msg);
    }

    console.log(msg);
    let c = function hello2() {
      console.log('hello im C' + msg);
    };

    return c;
  }

  closure2() {
    let name = 'anand';

    function named() {
      console.log(name);
      return console.log(name);
    }
    // name='abc' name will also get updated
    named();
  }

  //  typescript practise
  if() {
    let tname: string = 'Anand'; // ---> explicit type defining the type
    let tname2 = 'ANand'; // ---> implicit type means typescript defines the type

    // let tname3 = true;
    // tname3 = 'check'; //(Type 'string' is not assignable to type 'boolean'.);

    let tname3: any = true;
    tname3 = 'check'; //it works;

    // ts array

    let tname4: string[] = [];
    tname4.push('Anand'); // ['Nanad];
    // tname4.push(4) // Error-> Argument of type 'number' is not assignable to parameter of type 'string'

    // tuple =========

    let tuple: [number, boolean, string];

    tuple = [25, true, 'anand']; // error --> Type 'boolean' is not assignable to type 'number'
  }
}
