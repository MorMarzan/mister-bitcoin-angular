import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trade } from '../../models/trade.model';
import { BitcoinService } from '../../services/bitcoin.service';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  trades$!: Observable<Trade>

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit(): Promise<void> {
    this.trades$ = this.bitcoinService.getTradeVolume()
  }

  colorScheme = {
    domain: ['#F67E7E']
  } as any
}
