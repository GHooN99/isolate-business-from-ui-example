import { GameNotInitializedException } from '../model/Errors';
import { GameResult } from '../model/GameResult';
import { AnswerCheckService } from '../services/AnswerCheckService';
import { InputValidateService } from '../services/InputValidateService';
import { OpponentManageService } from '../services/OpponentManageService';
import { asserts } from '../utils/asserts';

export interface GameController {
  start(): void;
  restart(): void;
  getResult(input: string): GameResult;
}

export default class GameControllerImpl implements GameController {
  private isGameStarted: boolean = false;

  public constructor(
    private readonly opponentManageService: OpponentManageService,
    private readonly inputValidateService: InputValidateService,
    private readonly answerCheckService: AnswerCheckService
  ) {}

  public start(): void {
    this.opponentManageService.init();
    this.isGameStarted = true;
  }

  public restart(): void {
    asserts(this.isGameStarted, { ifFail: new GameNotInitializedException() });
    this.opponentManageService.init();
  }

  public getResult(input: string): GameResult {
    asserts(this.isGameStarted, { ifFail: new GameNotInitializedException() });

    this.inputValidateService.validate(input);

    const result = this.opponentManageService.evaluate(input);
    const { attemptCount } = this.opponentManageService;

    return {
      result: { ...result },
      attemptCount,
      isCorrect: this.answerCheckService.checkIsCorrect(result.strike),
    };
  }
}
