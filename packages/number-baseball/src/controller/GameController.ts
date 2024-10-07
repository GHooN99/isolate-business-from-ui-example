import { GameConfiguration } from '../model/GameConfiguration';
import { GameResult } from '../model/GameResult';
import { OpponentManageService } from '../services/OpponentManageService';
import { asserts } from '../utils/asserts';

export interface GameController {
  start(): void;
  restart(): void;
  getResult(input: string): GameResult;
}

export class GameControllerImpl implements GameController {
  private isGameStarted: boolean = false;

  public constructor(
    private readonly opponentManageService: OpponentManageService,
    private readonly gameConfiguration: GameConfiguration
  ) {}

  public start(): void {
    this.opponentManageService.init();
    this.isGameStarted = true;
  }

  public restart(): void {
    asserts(this.isGameStarted, 'Game is not started');
    this.opponentManageService.init();
  }

  public getResult(input: string): GameResult {
    asserts(this.isGameStarted, 'Game is not started');
    asserts(this.gameConfiguration.digitCount === input.length, 'Invalid input length');

    const result = this.opponentManageService.evaluate(input);
    const { attemptCount } = this.opponentManageService;

    return {
      result: { ...result },
      attemptCount,
      isCorrect: result.strike === this.gameConfiguration.digitCount,
    };
  }
}
