import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Route, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Event } from '../../../models/event'
import { EventService} from '../../../services/event.service';
import {ResponseApi} from '../../../models/api';
import {TaskType} from '../../../models/taskType';
import {TasktypeService} from '../../../services/tasktype.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {ModalService} from '../../../services/modal.service';
import { getUrlScheme } from '@angular/compiler';



// import {Pipe, PipeTransform} from '@angular/core';
// import {invalidPipeArgumentError} from '@angular/common/esm2015/src/pipes/invalid_pipe_argument_error';

// /home/vardane/front_volontaria/Website-Volontaria/node_modules/@angular/common/esm2015/src/pipes/invalid_pipe_argument_error.js
// node_modules/@angular/common/esm2015/src/pipes/invalid_pipe_argument_error.js



@Component({
  selector: 'app-admin-event-details',
  templateUrl: './admin-event-details.component.html',
  styleUrls: ['./admin-event-details.component.scss']
})
export class AdminEventDetailsComponent implements OnInit {

  loading: boolean = true;
  // an_event$: Event = {} as Event;
  // an_event$!: Observable<Event>;
  // an_event: any;
  event: Event;
  eventId: String;


  tasktypeList: TaskType[];
  tasktypeList$: Observable<TaskType[]>;

  headers: Headers
  

  // Deletion
  // @Input() an_event: Event;
  // @Input() canDelete = false;

  @Output() onDeletion: EventEmitter<boolean> = new EventEmitter<boolean>();

  deleteModalName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private tasktypeService: TasktypeService,
    private snackBar: MatSnackBar,
    private modalService: ModalService,    
    ) { }


  ngOnInit(): void {
    // see https://angular.io/guide/router-tutorial-toh#define-a-wildcard-route
    // this.an_event$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     this.deleteModalName = 'delete_event_' + params.get('id');
    //     return this.eventService.getById(Number(params.get('id')!))
    //   })
    // );

    this.route.params.subscribe( params => this.eventId = params.id)
    

    this.eventService.getById(Number(this.eventId)).subscribe(
      (data) => {
        this.event = data;
      }
    )

    // this.route.params.subscribe((params: Params) => {
    //   console.log(`voici les params`)
    //   console.log(params)
    //   this.eventId = params['id'];
    //   this.eventService.getById(Number(params['id']!)).subscribe(
    //       (data) => {
    //           this.event = data;
    //           console.log(`voici les donnees:`)
    //           console.log(data)
    //           console.log(`voici l'evt`)
    //           console.log(this.event)

    //           return this.event
    //       },
    //       (error) => {
    //           console.log('Mmmh, cet Event nexiste pas, on devrait afficher une erreur 404');
    //       }
    //   );
    // });

    // this.event.url = this.getUrl(this.event)

    // https://stackoverflow.com/questions/53617261/angular-httpclient-delete

    // console.log('retour variable evt:')
    // console.log(this.event) 

    // console.log(this.router.url);

    
  }


  // getUrl(event: Event): string {
  //   return event.url
  // } 

  deleteEvent(): void {
    // see https://stackoverflow.com/questions/53617261/angular-httpclient-delete
    this.eventService.delete(this.event.url).subscribe();

    // this.deleteModalName = 'delete_event_' + this.event.id;
  }


}


    // this.route.params.subscribe((params: Params) => {
    //   console.log(`voici les params`)
    //   console.log(params)
    //   this.eventId = params['id'];
    //   this.eventService.getById(Number(params['id']!)).subscribe(
    //       (data) => {
    //           this.event = data;
    //           console.log(`voici les donnees:`)
    //           console.log(data)
    //           console.log(`voici l'evt`)
    //           console.log(this.event)
    //       });
    //           // return this.event


    //           this.eventService.delete(this.event.url).subscribe(
    //             (data) => {
    //               this.snackBar.open(
    //                 "L'événement a été supprimé",
    //                 "X",
    //                 {
    //                   duration: 10000,
    //                 }
    //               );


    //             },
          
    //             (error) => {
    //                 console.log('Mmmh, cet Event a supprimer nexiste pas, on devrait afficher une erreur 404');
    //               }
    //           );
    //   });
  // }
  
  

  // // Essais temporaires
  // essaiRetour(): string {
  //   return 'bon!'
  //   };

  // essaiAffichage(s: string) {
  //   s = this.essaiRetour()
  //   console.log(s)
  // }

  // } 



    //   console.log(this.event.url)
    //   this.eventService.delete(this.event.url).subscribe(
    //     (data) => {
    //       this.snackBar.open(
    //         "L'événement a été supprimé",
    //         "X",
    //         {
    //           duration: 10000,
    //         }
    //       );
    //       this.modalService.get(this.deleteModalName).close();
    //     }
    //   );

    //   this.onDeletion.emit(true);

    // }
  // }



    // updateProfile(userInformation: IUserInformation): Observable<User> {
    //   const headers = GlobalService.getHeaders();
    //   return this.http
    //     .patch<any>(this.urlProfile, userInformation, { headers })
    //     .pipe(
    //       map((data) => new User().deserialize(data)),
    //       tap((user: User) => this.setProfile(user))
    //     );
    // }
  
      // patch(url: string, patchContent: any): Observable<T> {
  //   const headers: HttpHeaders = GlobalService.getHeaders();

  //   return this.http
  //     .patch<T>(url, patchContent, { headers })
  //     .pipe(map((data) => new this.c().deserialize(data)));
  // }

  // setProfile(profile: User): void {
  //   this.currentProfile.next(profile);
  // }



  // getById(id: number): Observable<T> {
  //   return this.http
  //     .get<T>(this.url + '/' + id, {
  //       headers: GlobalService.getHeaders(),
  //     })
  //     // .pipe(map((data) => new this.c(data)));
  //     .pipe(map((data) => new this.c().deserialize(data)));
  // }
  

  

    // this.activatedRoute.params.subscribe((params: Params) => {
    //     this.an_event$.id
    //   this.cellId = params['cellId'];
      // this.getParticipations();
      // this.changeSelectedDate(this.selectedDate);
      // this.changeCurrentMonth(this.actualMonth);
    // });
    // this.getTaskTypeList();
  // }

  // gotoEvents(an_event: Event) {
  //   const eventId = an_event ? an_event.id : null;
    // Pass along the event id if available
    // so that the EventList component can select that event.
    // Include a junk 'foo' property for fun.
//     this.router.navigate(['/admin-events', { id: eventId, foo: 'foo' }]);
//   }

// }