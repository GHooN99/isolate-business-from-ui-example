import { OpponentNotInitializedException } from '../model/Errors';
import { EvaluatedResult } from '../model/EvaluatedResult';
import OpponentImpl, { Opponent } from '../model/Opponent';
import { requires } from '../utils/requires';
import { AnswerGenerateService } from './AnswerGenerateService';
import { GameEvaluateService } from './GameEvalutateService';

export interface OpponentManageService {
  init(): void;
  evaluate(input: string): EvaluatedResult;
  get attemptCount(): number;
}

export default class OpponentManageServiceImpl implements OpponentManageService {
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
