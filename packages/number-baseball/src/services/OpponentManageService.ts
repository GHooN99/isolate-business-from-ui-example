import { GameResult, makeGameResult } from '../model/GameResult';
import OpponentImpl, { Opponent } from '../model/Opponent';
import AnswerGenerateService from './AnswerGenerateService';
import { GameEvaluateService } from './GameEvalutateService';

export interface OpponentManageService {
  init(): void;
  evaluate(input: string): GameResult;
}

export default class OpponentManageServiceImpl implements OpponentManageService {
  private opponents: Opponent[] = [];

  constructor(
    private readonly answerGenerateService: AnswerGenerateService,
    private readonly gameEvaluateService: GameEvaluateService
  ) {}

  public init(): void {
    this.opponents.push(new OpponentImpl(this.answerGenerateService.generate()));
  }

  public evaluate(input: string): GameResult {
    const { answer, attemptCount } = this.opponents[0];
    const result = this.gameEvaluateService.evaluate(input, answer);

    return makeGameResult(result, attemptCount);
  }
}
