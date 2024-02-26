import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$ = new BehaviorSubject<User>({
    name: "Satoshi Nakamoto",
    balance: 100,
    transaction: []
  })

  public user$ = this._user$.asObservable()

  getUser() {
    return this._user$.value
  }
}
