import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Socket , Server} from "socket.io";
import { PriceService } from "./price/price.service";
import { OrderbookService } from "./orderbook/orderbook.service";
import { TradeService } from "./trade/trade.service";
import { OnEvent } from "@nestjs/event-emitter";
import { OnModuleInit } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class TradingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private priceService: PriceService, private orderBookService: OrderbookService, private tradeService: TradeService){};

  handleConnection(client: Socket) {
    console.log("Connection Connected ",client.id)      
  }

  handleDisconnect(client: Socket){
    console.log("Connection Disconnected",client.id)
  }

  onModuleInit(){
    setInterval(() => {
      this.priceService.updatePrices();
      this.orderBookService.updateBooks();
      this.tradeService.generateTrades(1);
    },1000)
  }


  @OnEvent('price.update')
  handlePriceUpdate(payload: {symbol: string, price: number}){
    const topic = `${payload.symbol}.price`;
    this.server.to(topic).emit('priceUpdate',payload);
  }

  @OnEvent('orderbook.update')
  handleOrderUpdate(payload: {symbol: string; book: any}){
    const topic = `${payload.symbol}.orderbook`;
    this.server.to(topic).emit('orderBookUpdate',payload);
  }

  @OnEvent('trade.update')
  handleTradeUpdate(payload:any){
    const topic = `${payload.symbol}.trades`;
    this.server.to(topic).emit('tradeUpdate', payload);
  }


  @SubscribeMessage('subscribe')
  handleSubscribe(
    @MessageBody() data: {topic: string},
    @ConnectedSocket() client: Socket
  ){
    const topic = data.topic;
    client.join(topic);
    console.log(`${client.id} subscibed to ${topic}`)
    client.emit('subscribed',{
      topic,
      message:`subscribed to ${topic}`
    })
  }


}

