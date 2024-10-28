import { EvaluatedResult } from '../../model/evaluated-result';

export interface OpponentManageService {
  init(): void;
  evaluate(input: string): EvaluatedResult;
  get attemptCount(): number;
}
