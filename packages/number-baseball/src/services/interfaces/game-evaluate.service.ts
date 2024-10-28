import { EvaluatedResult } from '../../model/evaluated-result';

export interface GameEvaluateService {
  evaluate(input: string, answer: string): EvaluatedResult;
}
