import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-benevolometre',
  templateUrl: './my-benevolometre.component.html',
  styleUrls: ['./my-benevolometre.component.scss']
})
export class MyBenevolometreComponent implements OnInit {

  @Input() parts: any;

  constructor() { }

  ngOnInit() {
    let total = 0;
    for (const part of this.parts) {
      part.totalPercentage = part.percentage + total;
      total += part.percentage;
    }
  }

}
