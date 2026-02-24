import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PriceService {
    constructor(private eventEmitter: EventEmitter2){}
    private prices = {
        AAPL: 180, 
        TSLA: 240,
        BTC: 50000,
        ETH: 3000
    }

    getPrices(){
        return this.prices;
    }
    updatePrices(){
        Object.keys(this.prices).forEach((symbol) => {
            const change = (Math.random() - 0.5 ) * 2
            this.prices[symbol] += change
            this.prices[symbol] = Number(this.prices[symbol].toFixed(2));
            this.eventEmitter.emit('price.update',{symbol,price:this.prices[symbol]});
        });
        return this.prices
    }
}
