import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, switchMap, timer } from 'rxjs';
import { storageService } from './storage.service';

interface TradeVolume {
  values: { x: number, y: number }[]
}

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  TRADE_VOLUME_KEY = 'tradeVolume'

  constructor(private http: HttpClient) { }

  getRateStream(coins: number) {
    return timer(0, 1000 * 60 * 15).pipe(
      switchMap(() => this.getRate(coins))
    )
  }

  getRate(coins: number) {
    return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
  }

  getTradeVolume() {
    const data = storageService.load(this.TRADE_VOLUME_KEY)

    if (data) return of(data)
    return this.http.get<TradeVolume>(`https://api.blockchain.info/charts/trade-volume?timespan=5weeks&format=json&cors=true`)
      .pipe(map(res => {
        const vals = res.values.map(item => { return { name: new Date(item.x * 1000).toLocaleDateString("he-IL"), value: item.y } })
        storageService.store(this.TRADE_VOLUME_KEY, vals)
        return vals
      }))
  }

}

