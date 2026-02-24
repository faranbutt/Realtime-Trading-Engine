import { Module } from '@nestjs/common';
import { TradingGateway } from './trading.gateway';
import { PriceService } from './price/price.service';
import { OrderbookService } from './orderbook/orderbook.service';
import { TradeService } from './trade/trade.service';

@Module({
    providers: [TradingGateway, PriceService, OrderbookService, TradeService]
})
export class TradingModule {}
