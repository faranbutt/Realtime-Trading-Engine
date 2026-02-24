import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradingModule } from './trading/trading.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [TradingModule,EventEmitterModule.forRoot({wildcard:true,delimiter:'.'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
