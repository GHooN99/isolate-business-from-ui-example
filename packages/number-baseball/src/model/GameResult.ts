import { EvaluatedResult } from './GameEvaluator';

export type GameResult = {
  /** 결과 */
  result: EvaluatedResult;
  /** 시도 횟수 */
  attemptCount: number;
  /** 정답 여부 */
  isCorrect: boolean;
};
