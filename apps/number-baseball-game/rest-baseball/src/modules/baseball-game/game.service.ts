import createGameController, {
  GameNotInitializedException,
  GameResult,
  InvalidInputLengthException,
} from '@ibfu/number-baseball';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
  private game = createGameController();
  public constructor() {}

  public start(): string {
    try {
      this.game.start();
      return 'Game Started';
    } catch (e: unknown) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  }
  public restart(): string {
    try {
      this.game.restart();
      return 'Game Restarted';
    } catch (e: unknown) {
      if (e instanceof GameNotInitializedException) {
        throw new BadRequestException(e.message);
      }
      if (e instanceof Error) {
        return e.message;
      }
    }
  }
  public getResult(input: string): GameResult {
    try {
      const result = this.game.getResult(input);

      return result;
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new BadRequestException(e.message);
      }
    }
  }
}
