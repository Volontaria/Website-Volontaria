import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as CKEditor from '../../../ckeditor5/build/ckeditor.js';
import { CkeditorPageService } from '../../services/ckeditor-page.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { ProfileService } from '../../services/profile.service';
import { CkeditorPage } from '../../models/ckeditorPage';
import { SearchField } from '../../models/search-field';
import { map } from 'rxjs/operators';
import { ResponseApi } from '../../models/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ckeditor-container',
  templateUrl: './ckeditor-container.component.html',
  styleUrls: ['./ckeditor-container.component.scss'],
})
export class CkeditorContainerComponent implements OnInit {
  _pageKey: string;
  get pageKey(): string {
    return this._pageKey;
  }

  @Input('pageKey')
  set pageKey(value: string) {
    this._pageKey = value;
    this.refreshCKEditor();
  }

  @Input()
  autoSave = true;

  @Output() updatedAtChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  saved: EventEmitter<any> = new EventEmitter<any>();

  public Editor = CKEditor;
  public configWrite = {
    autosave: {
      // The minimum amount of time the Autosave plugin is waiting after the last data change.
      waitingTime: 5000,
      save: () => this.saveData(),
    },
  };
  public configRead = {};
  public config;

  disableEditor = true;

  ckEditorPage$: Observable<CkeditorPage[]>;
  ckEditorPage: CkeditorPage;

  profile: User;

  constructor(
    private auth: AuthenticationService,
    private profileService: ProfileService,
    private ckEditorPageService: CkeditorPageService
  ) {}

  ngOnInit(): void {
    this.refreshCKEditor();
  }

  refreshCKEditor(): void {
    this.ckEditorPage = null;
    this.profile = this.profileService.getProfile();
    this.disableEditor = !(this.profile && this.profile.is_superuser);
    this.config =
      this.disableEditor || !this.autoSave ? this.configRead : this.configWrite;
    const search: SearchField = {
      key: this.pageKey,
    };
    this.ckEditorPage$ = this.ckEditorPageService.search(search).pipe(
      map((responseApi: ResponseApi<CkeditorPage>) => {
        return responseApi.results;
      })
    );
    this.ckEditorPage$.subscribe((pages: CkeditorPage[]) => {
      this.ckEditorPage = pages[0];
      this.updatedAtChange.emit(pages[0].updated_at);
    });
  }

  public saveData() {
    const data = this.ckEditorPage.content;

    if (!this.disableEditor) {
      this.ckEditorPageService
        .patch(this.ckEditorPage.url, this.ckEditorPage)
        .subscribe((ckEditorPage) => {
          if (ckEditorPage) {
            this.ckEditorPage = ckEditorPage;
            this.saved.emit(ckEditorPage);
          }
        });
    }
  }
}
