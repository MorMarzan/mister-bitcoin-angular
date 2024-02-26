import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    class: 'main-layout full'
  }
})
export class HomeComponent implements OnInit {
  user!: User
  BTC$!: Observable<string>

  constructor(private userService: UserService, private bitcoinService: BitcoinService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.BTC$ = this.bitcoinService.getRateStream(this.user.balance)
  }
}
