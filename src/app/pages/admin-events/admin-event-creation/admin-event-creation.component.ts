import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-event-creation',
  templateUrl: './admin-event-creation.component.html',
  styleUrls: ['./admin-event-creation.component.scss']
})
export class AdminEventCreationComponent implements OnInit {

  
  
  constructor(
    private formBuilder: FormBuilder
  ) { }



  ngOnInit(): void {
  }

  createEventForm = this.formBuilder.group({
    start_time: '',
    end_time: '',
    nb_volunteers_needed: '',
    nb_volunteers_standby_needed: '',
    cell_name: '',
    cell_full_address: '',
    task_type_name: ''
})


onSubmit(): void {
  console.warn("L'événement a été créé.", this.createEventForm.value);
  this.createEventForm.reset();
}


}
