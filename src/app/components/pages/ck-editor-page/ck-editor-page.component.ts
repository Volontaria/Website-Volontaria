import {Component, forwardRef, OnDestroy, ViewChild} from '@angular/core';
import {CKEditorContainerComponent} from '../../shared/ckeditor-container/ckeditor-container.component';
import {NotificationsService} from 'angular2-notifications';
import {ActivatedRoute, NavigationEnd, Params, Router, RouterEvent} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {filter, takeUntil} from 'rxjs/operators';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  templateUrl: 'ck-editor-page.component.html',
  selector: 'app-ck-editor-page',
  styleUrls: ['ck-editor-page.component.scss'],
})
export class CkEditorPageComponent implements OnDestroy {

  public destroyed = new Subject<any>();

  @ViewChild(forwardRef(() => CKEditorContainerComponent), {static: false})
  private cKEditorContainerComponent: CKEditorContainerComponent;

  CKEditorKey: string;

  constructor(private notificationService: NotificationsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.refreshCKEditorContent();
    });
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  refreshCKEditorContent() {
    this.CKEditorKey = null;
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        console.log(params['key']);
        this.CKEditorKey = params['key'];
      }
    );
  }

  saveCKEditor() {
    this.cKEditorContainerComponent.saveData();
  }

  dataSaved() {
    this.notificationService.success('Sauvegarde effectuee');
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
