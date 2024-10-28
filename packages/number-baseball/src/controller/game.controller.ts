import { GameNotInitializedException } from '../model/errorss';
import { GameResult } from '../model/game-result';
import { AnswerCheckService } from '../services/interfaces/answer-check.service';
import { InputValidateService } from '../services/interfaces/input-validate.service';
import { OpponentManageService } from '../services/interfaces/opponent-manage.service';
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
