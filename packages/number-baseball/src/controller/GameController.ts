import { GameNotInitializedException } from '../model/Errors';
import { GameResult } from '../model/GameResult';
import { AnswerCheckService } from '../services/AnswerCheckService';
import { InputValidateService } from '../services/InputValidateService';
import { OpponentManageService } from '../services/OpponentManageService';
import { requires } from '../utils/requires';

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
    requires(this.isGameStarted, { elseThrow: new GameNotInitializedException() });
    this.opponentManageService.init();
  }

  public getResult(input: string): GameResult {
    requires(this.isGameStarted, { elseThrow: new GameNotInitializedException() });

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
