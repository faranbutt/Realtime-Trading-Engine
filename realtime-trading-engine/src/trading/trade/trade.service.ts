import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { table } from 'console';

interface tradesDataType {
    symbol: string;
    price: number;
    size: number;
    side: string;
    timestamp: number;


}

@Injectable()
export class TradeService {
    constructor(private eventEmitter: EventEmitter2){}
    private symbols = ['AAPL','TSLA','BTC','ETH'];
    generateRandomTrade() {
        const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        const price = Number((Math.random() * 100 + 100).toFixed(2));
        const size = Number((Math.random() * 5).toFixed(2));
        const side = Math.random() > 0.5 ? 'buy' : 'sell';
        const timestamp = Date.now();
        return {symbol,price,size,side,timestamp};

    }


    generateTrades(count:number = 1){
        const trades: tradesDataType[]  = [];
        for (let i = 0;i < count ; i++){
            const trade = this.generateRandomTrade()
            this.eventEmitter.emit('trade.update',trade);
            trades.push(trade);
        }
        return trades;

    }
}
