import { Module } from '@nestjs/common';
import { GameModule } from './modules/baseball-game/game.module';

@Module({
  imports: [GameModule],
})
export class AppModule {}
