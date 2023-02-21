import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;
  title = 'Hello World';

  // Interpolation.
  myValue = "Interpolation Value";

  // Property Binding.
  height: number = 40;

  //Event Binding.
  num1: number = 10;
  num2: number = 30;
  result: any;

  add() {
    this.result = this.num1 + this.num2;
  }

  // Two way data binding.
  nameValue: any;
  fstNum: any;
  secNum: any;
  sumResult: any;

  add1(fst: number, sec: number) {
    this.sumResult = fst + sec;
  }

  //----------------------------------------------------------------------
  //Component Communication.
  //@Input
  parentMessage = "I am a msg in the parent component";
  childMessage = "I will be passed from PC to CC";


  // ---------------------------------------------------------------------
  ngOnInit(): void {
    this.data = this.getData();
  }

  getData() {
    return[
      {
        "_id": "11",
        "body": "Hello world 11.",
        "title": "Hello World 11"
      },

      {
        "_id": "19",
        "body": "Hello world 19.",
        "title": "Hello World 19"
      },

      {
        "_id": "22",
        "body": "Hello world 22.",
        "title": "Hello World 22"
      }
    ]
  }
}
