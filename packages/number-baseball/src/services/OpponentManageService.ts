import { EvaluatedResult } from '../model/EvaluatedResult';
import OpponentImpl, { Opponent } from '../model/Opponent';
import { asserts } from '../utils/asserts';
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
    asserts(this.opponent !== null, { ifFail: new Error('Opponent is not initialized') });
    this.opponent.increaseAttemptCount();

    const { answer } = this.opponent;
    const result = this.gameEvaluateService.evaluate(input, answer);

    return result;
  }

  public get attemptCount(): number {
    asserts(this.opponent !== null, { ifFail: new Error('Opponent is not initialized') });
    return this.opponent.attemptCount;
  }
}
