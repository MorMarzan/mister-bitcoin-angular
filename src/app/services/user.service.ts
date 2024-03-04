import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction, User } from '../models/user.model';
import { storageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  KEY = 'loggedinUser'

  private _user$ = new BehaviorSubject<User | null>(
    storageService.load(this.KEY) || null
  )

  public user$ = this._user$.asObservable()


  getUser(): User | null {
    return this._user$.value
  }

  signup(userName: string): User {
    const newUser: User = {
      name: userName,
      balance: 100,
      transactions: [],
      imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    }
    this._user$.next(newUser)
    storageService.store(this.KEY, newUser)
    return newUser

  }

  logout(): void {
    storageService.remove(this.KEY)
    this._user$.next(null)
  }

  transferFunds(toContact: { name: string; _id: string; }, amount: number) {
    const user = this.getUser()
    if (!user) throw new Error('Not loggedin')
    user.balance -= amount
    const newTransaction: Transaction = { toId: toContact._id, to: toContact.name, at: Date.now(), amount };
    (user.transactions as Transaction[]).unshift(newTransaction)
    storageService.store(this.KEY, user)
    this._user$.next(user)
  }

  getTransactions(contactId?: string) {
    const user = this.getUser();
    if (!user) throw new Error('Not loggedin');
    const transactions = user.transactions;
    return (!contactId) ? transactions : transactions.filter(transaction => transaction.toId === contactId);
  }

}
