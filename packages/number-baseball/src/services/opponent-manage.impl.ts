import { OpponentNotInitializedException } from '../model/errorss';
import { EvaluatedResult } from '../model/evaluated-result';
import OpponentImpl, { Opponent } from '../model/opoonents';
import { requires } from '../utils/requires';
import { AnswerGenerateService } from './interfaces/answer-generate.service';
import { GameEvaluateService } from './interfaces/game-evaluate.service';

import { OpponentManageService } from './interfaces/opponent-manage.service';

export class OpponentManageServiceImpl implements OpponentManageService {
  private opponent: Opponent | null = null;

  public constructor(
    private readonly answerGenerateService: AnswerGenerateService,
    private readonly gameEvaluateService: GameEvaluateService
  ) {}

  public init(): void {
    this.opponent = new OpponentImpl(this.answerGenerateService.generate());
  }

  public evaluate(input: string): EvaluatedResult {
    requires(this.opponent !== null, { elseThrow: new OpponentNotInitializedException() });
    this.opponent.increaseAttemptCount();

    const { answer } = this.opponent;
    const result = this.gameEvaluateService.evaluate(input, answer);

    return result;
  }

  public get attemptCount(): number {
    requires(this.opponent !== null, { elseThrow: new OpponentNotInitializedException() });
    return this.opponent.attemptCount;
  }
}
