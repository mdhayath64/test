import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: ' ',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  

  // Output
  @Output()
  foo = new EventEmitter();
  counter = 0;

  usefoo() {
    this.foo.emit(this.counter);
  }


  @Input()
    helloMessage: any;

  constructor() { }

  ngOnInit()
  {

  }
}
