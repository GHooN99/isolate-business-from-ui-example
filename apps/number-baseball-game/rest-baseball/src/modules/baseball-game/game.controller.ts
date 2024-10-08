import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResult } from '@ibfu/number-baseball';

@Controller('/game')
export class GameController {
  public constructor(private readonly gameService: GameService) {}

  @Get('start')
  public startGame(): string {
    return this.gameService.start();
  }

  @Get('restart')
  public restartGame(): string {
    return this.gameService.restart();
  }

  @Post('result')
  public sendResult(@Body('input') input: string): GameResult {
    return this.gameService.getResult(input);
  }
}
