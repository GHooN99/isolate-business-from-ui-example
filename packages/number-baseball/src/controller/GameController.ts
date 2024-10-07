import { GameResult } from '../model/GameResult';
import { OpponentManageService } from '../services/OpponentManageService';

export interface GameController {
  start(): void;
  restart(): void;
  getResult(input: string): GameResult;
}

export class GameControllerImpl implements GameController {
  constructor(private readonly opponentManageService: OpponentManageService) {}

  start(): void {
    this.opponentManageService.init();
  }

  restart(): void {
    this.opponentManageService.init();
  }

  getResult(input: string): GameResult {
    return this.opponentManageService.evaluate(input);
  }
}
