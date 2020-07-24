import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-detail-preview-section',
  templateUrl: './event-detail-preview-section.component.html',
  styleUrls: ['./event-detail-preview-section.component.scss']
})
export class EventDetailPreviewSectionComponent implements OnInit {

  @Input() title;
  @Input() maximum;
  @Input() value;

  constructor() { }

  ngOnInit(): void {
  }

  get percentage(): number {
    if (this.maximum !== null && this.value !== null) {
      if (this.maximum === 0) {
       return 100;
      } else {
        return this.value / this.maximum * 100;
      }
    } else {
      return 0;
    }
  }

  get color(): string {
    if (this.status === 'Complet') {
      return '#42A948';
    } else if (this.status === 'Critique'){
      return '#C82333';
    } else {
      return null;
    }
  }

  get status(): string {
    if (this.maximum !== null && this.value !== null) {
      if (this.percentage > 80) {
        return 'Complet';
      } else {
        return 'Critique';
      }
    } else {
      return null;
    }
  }
}
