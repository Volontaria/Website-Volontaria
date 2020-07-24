import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUserInformation, User } from '../models/user';
import { map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpEventType,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends GlobalService {
  static USER_PROFILE_KEY = 'userProfile';

  urlProfile = `${this.apiUrl}/rest-auth/user/`;

  private currentProfile: BehaviorSubject<User> = new BehaviorSubject<User>(
    ProfileService.getProfileStorage()
  );
  public currentProfile$: Observable<
    User
    > = this.currentProfile.asObservable();

  constructor(public http: HttpClient) {
    super();
    this.currentProfile$.subscribe((profile: User) => {
      if (profile) {
        ProfileService.setProfileStorage(profile);
      } else {
        ProfileService.removeProfileStorage();
      }
    });
  }

  static getProfileStorage(): User {
    const localProfile = localStorage.getItem(this.USER_PROFILE_KEY);

    if (localProfile) {
      return new User().deserialize(JSON.parse(localProfile));
    } else {
      return new User();
    }
  }

  static setProfileStorage(profile: User): void {
    localStorage.setItem(this.USER_PROFILE_KEY, JSON.stringify(profile));
  }

  static removeProfileStorage(): void {
    localStorage.removeItem(this.USER_PROFILE_KEY);
  }

  setProfile(profile: User): void {
    this.currentProfile.next(profile);
  }

  getProfile(): User {
    return this.currentProfile.getValue();
  }

  removeProfile(): void {
    this.currentProfile.next(null);
  }

  retrieveProfile(): Observable<User> {
    const headers = GlobalService.getHeaders();
    return this.http
      .get<any>(this.urlProfile, { headers })
      .pipe(
        map((data) => new User().deserialize(data)),
        tap((user: User) => this.setProfile(user))
      );
  }

  updateProfile(userInformation: IUserInformation): Observable<User> {
    const headers = GlobalService.getHeaders();
    return this.http
      .patch<any>(this.urlProfile, userInformation, { headers })
      .pipe(
        map((data) => new User().deserialize(data)),
        tap((user: User) => this.setProfile(user))
      );
  }
}
