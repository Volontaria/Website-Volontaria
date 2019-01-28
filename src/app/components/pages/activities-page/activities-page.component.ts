import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event';
import { TasktypeService } from '../../../services/tasktype.service';
import { Tasktype } from '../../../models/tasktype';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, DAYS_OF_WEEK } from 'angular-calendar';
import { Cell } from '../../../models/cell';
import { CellService } from '../../../services/cell.service';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {MyModalService} from '../../../services/my-modal/my-modal.service';

const colors: any = {
  grey: {
    primary: '#a2a2a2',
    secondary: '#eff1ea'
  },
  green: {
    primary: '#42A948',
    secondary: '#bdffc7'
  },
  yellow: {
    primary: '#cd8535',
    secondary: '#FDF1BA'
  },
  red: {
    primary: '#C82333',
    secondary: '#FAE3E3'
  }
};

@Component({
  templateUrl: 'activities-page.component.html',
  selector: 'app-activities',
  styleUrls: ['activities-page.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CalendarDateFormatter
    }
  ]
})
export class ActivitiesPageComponent implements OnInit {

  user: User;
  events: Event[];
  cell: Cell;

  filteredEvents: Event[];

  dropdownTasktypeList = [];
  selectedTasktypes = [];
  dropdownTasktypeSettings = {};

  view = 'month';
  viewDate: Date = new Date();
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  locale = 'fr';
  calendarEvents: CalendarEvent[] = [];
  activeDayIsOpen = false;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-plus"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.eventClicked(event);
      }
    },
  ];

  eventsOfDay = [];
  clickedDay = null;
  settings = {
    noDataText: 'Aucune plage horaire pour ce jour.',
    clickable: true,
    columns: [
      {
        name: 'tasktype',
        title: 'Type de tâche'
      },
      {
        name: 'start_date',
        title: 'Heure de début'
      },
      {
        name: 'end_date',
        title: 'Heure de fin'
      },
      {
        name: 'nb_volunteers',
        title: 'Nombre de bénévoles'
      },
      {
        name: 'nb_standby',
        title: 'Nombre de remplaçants'
      }
    ]
  };

  benevolometre = [
    {
      color: '#C82333',
      percentage: 50,
      title: 'La plage horaire ne contient pas assez de bénévoles ' +
      'et le déroulement de l\'événement en sera impacté directement.'
    },
    {
      color: '#cd8535',
      percentage: 30,
      title: 'La plage horaire contient assez de bénévoles pour ' +
      'que l\'événement se déroule comme prévu, mais nous n\'aurons ' +
      'pas assez de bénévoles pour tenir certains postes optionnels.'
    },
    {
      color: '#42A948',
      percentage: 20,
      title: 'La plage horaire dispose d\'assez de bénévoles pour ' +
      'que tout le monde puisse s\'épanouir durant l\'événement, ' +
      'c\'est le rythme de croisière!'
    }
  ];

  constructor(private eventService: EventService,
              private tasktypeService: TasktypeService,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cellService: CellService,
              private myModalService: MyModalService) {}

  ngOnInit() {
    this.user = this.authenticationService.getProfile();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.cellService.getCell(params['cell']).subscribe(
        data => {
          this.cell = new Cell(data);
        }
      );
      this.eventService.getEvents([{name: 'cell', value: params['cell']}]).subscribe(
        data => {
          this.events = data.results.map(e => new Event(e));
          this.filter();
        }
      );
    });

    this.tasktypeService.getTasktypes().subscribe(
      data => {
        const tasktypes = data.results.map(t => new Tasktype(t) );
        for (const tasktype of Object.keys(tasktypes)) {
          this.dropdownTasktypeList.push(this.tasktypeToDict(tasktypes[tasktype]));
        }
      }
    );

    this.dropdownTasktypeSettings = {
      singleSelection: false,
      text: 'Choisis ton(tes) activité(s)',
      selectAllText: 'Toutes',
      unSelectAllText: 'Aucune',
      classes: 'activities-page__header__filters__filter',
    };
  }

  onItemSelect(_item: any) {
    this.filter();
  }

  OnItemDeSelect(_item: any) {
    this.filter();
  }

  onSelectAll(_items: any) {
    this.filter();
  }

  onDeSelectAll(_items: any) {
    this.filter();
  }

  private tasktypeToDict(tasktype: Tasktype) {
    return {
      'id': tasktype.id,
      'itemName': tasktype.name,
    };
  }

  private elemIsFiltered(elem, filters) {
    for (const filter in filters) {
      if (filters[filter].id === elem.id) {
        return true;
      }
    }
    return false;
  }

  filter() {
    this.filteredEvents = this.filterListOfEvent(this.events);
    this.syncCalendarEvent();
    if (this.clickedDay) {
      this.eventsOfDay = [];
      for (const event of this.filteredEvents) {
        const eventDate = new Date(event.start_date);
        const clickedDate = new Date(this.clickedDay);

        if (eventDate.setHours(0, 0, 0, 0) === clickedDate.setHours(0, 0, 0, 0) ) {
          this.eventsOfDay.push(this.eventAdapter(event));
        }
      }
    }
  }

  filterListOfEvent(eventsToFilter) {
    const eventFiltered = [];
    const eventInFuture = [];

    // Filter all events in past
    for (const event of eventsToFilter) {
      if (new Date(event.start_date).getTime() > new Date().getTime()) {
        eventInFuture.push(event);
      }
    }

    for (const event of eventInFuture) {
      // If no task_type filter or filter is verified
      if ( this.selectedTasktypes.length === 0
        || this.elemIsFiltered(this.tasktypeToDict(event.task_type), this.selectedTasktypes)) {
        eventFiltered.push(event);
      }
    }

    // If no filters, we take all events
    if (this.selectedTasktypes.length === 0) {
      return eventInFuture;
    } else {
      return eventFiltered;
    }
  }

  syncCalendarEvent() {
    this.calendarEvents = [];
    for (const event of this.filteredEvents) {
      const newEvent = {
        id: event.id,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
        title: event.task_type.name,
        action: this.actions
      };

      const percentageVolunteers = event.nb_volunteers / event.nb_volunteers_needed;
      if (event.volunteers.lastIndexOf(this.user.id) >= 0) {
        newEvent['color'] = colors.grey;
      } else {
        if (percentageVolunteers >= 0.8) {
          newEvent['color'] = colors.green;
        } else if (percentageVolunteers >= 0.5) {
          newEvent['color'] = colors.yellow;
        } else {
          newEvent['color'] = colors.red;
        }
      }
      this.calendarEvents.push(newEvent);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.viewDate = date;
    this.clickedDay = date;
    this.eventsOfDay = [];
    for (const event of this.filteredEvents) {
      for (const eventOfDay of events) {
        if (event.id === eventOfDay.id) {
          this.eventsOfDay.push(this.eventAdapter(event));
        }
      }
    }
  }

  eventClicked(eventClicked) {
    for (const event of this.filteredEvents) {
      if (event.id === eventClicked.id) {
        if (event.volunteers.lastIndexOf(this.user.id) >= 0) {
          this.toggleModal('already_volunteer');
        } else {
          this.router.navigate(['/confirmation/' + event.id]);
        }
      }
    }
  }

  eventAdapter(event) {
    const newEvent = {
      id: event.id,
      tasktype: event.task_type.name,
      start_date: event.getStartTime(),
      end_date: event.getEndTime(),
      nb_volunteers: event.nb_volunteers + '/' + event.nb_volunteers_needed,
      nb_standby: event.nb_volunteers_standby + '/' + event.nb_volunteers_standby_needed
    };
    return newEvent;
  }

  toggleModal(name) {
    const modal = this.myModalService.get(name);

    if (!modal) {
      console.error('No modal named %s', name);
      return;
    }
    modal.toggle();
  }
}
