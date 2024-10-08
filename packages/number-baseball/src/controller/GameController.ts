import { GameConfiguration } from '../model/GameConfiguration';
import { GameResult } from '../model/GameResult';
import { OpponentManageService } from '../services/OpponentManageService';
import { asserts } from '../utils/asserts';

// input validation service(config)
// result evaluation service(config) 가 추가됨
// 이러면 컨트롤러는 config 를 참조하지 않게 됨

// error 커스텀 해야함
// asserts(condition,{ifFail:Error})
export interface GameController {
  start(): void;
  restart(): void;
  getResult(input: string): GameResult;
}

export default class GameControllerImpl implements GameController {
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
    asserts(this.isGameStarted, { ifFail: new Error('Game is not started') });
    this.opponentManageService.init();
  }

  public getResult(input: string): GameResult {
    asserts(this.isGameStarted, { ifFail: new Error('Game is not started') });

    asserts(this.gameConfiguration.digitCount === input.length, {
      ifFail: new Error('Invalid input length'),
    });

    const result = this.opponentManageService.evaluate(input);
    const { attemptCount } = this.opponentManageService;

    return {
      result: { ...result },
      attemptCount,
      isCorrect: result.strike === this.gameConfiguration.digitCount,
    };
  }
}
