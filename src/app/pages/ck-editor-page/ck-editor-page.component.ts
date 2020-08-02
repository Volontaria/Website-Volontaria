import { Component, forwardRef, OnDestroy, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { CkeditorContainerComponent } from '../../components/ckeditor-container/ckeditor-container.component';
import { ProfileService } from '../../services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  templateUrl: 'ck-editor-page.component.html',
  selector: 'app-ck-editor-page',
  styleUrls: ['ck-editor-page.component.scss'],
})
export class CkEditorPageComponent implements OnDestroy {
  public destroyed = new Subject<any>();

  @ViewChild(forwardRef(() => CkeditorContainerComponent), { static: false })
  private cKEditorContainerComponent: CkeditorContainerComponent;

  cKEditorKey: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroyed)
      )
      .subscribe(() => {
        this.refreshCKEditorContent();
      });
  }

  isAdmin() {
    return this.profileService.getProfile().is_superuser;
  }

  refreshCKEditorContent() {
    this.cKEditorKey = null;
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params['key']);
      this.cKEditorKey = params['key'];
    });
  }

  saveCKEditor() {
    this.cKEditorContainerComponent.saveData();
  }

  dataSaved() {
    this.snackBar.open('Sauvegarde effectuée', '', {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
