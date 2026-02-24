import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderbookService {
    constructor(private eventEmitter: EventEmitter2) {}
    private books = {
        AAPL: this.generateBook(180),
        TSLA: this.generateBook(240),
        BTC: this.generateBook(50000),
        ETH: this.generateBook(3000)
    }
    private generateBook(basePrice: number){
        
        const bids: number[][] = [];
        const asks: number[][] = [];
        for (let i = 0;i<5;i++){
            bids.push([
                Number((basePrice - i * Math.random()).toFixed(2)),
                Number((Math.random()*5).toFixed(2))
            ])

            asks.push([
                Number((basePrice + i * Math.random()).toFixed(2)),
                Number((Math.random()*5).toFixed(2))
            ])
        }

        return {bids,asks};

    }


    updateBooks(){
        Object.keys(this.books).forEach(symbol => {
            const mid = this.books[symbol].bids[0][0];
            this.books[symbol] = this.generateBook(mid)
            this.eventEmitter.emit('orderbook.update',{
                symbol,
                book: this.books[symbol]
            })
        })
        return this.books;
    }
}
