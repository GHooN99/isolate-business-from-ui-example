import { GameEvaluator } from '../model/GameEvaluator';

export interface GameEvaluateService {
  evaluate(input: string, answer: string): string;
}

export default class GameEvaluateServiceImpl implements GameEvaluateService {
  constructor(private readonly evaluators: GameEvaluator[]) {}

  public evaluate(input: string, answer: string): string {
    return this.evaluators.map((evaluator) => evaluator.evaluate(input, answer)).join('');
  }
}
