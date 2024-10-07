export type GameResult = {
  /** 결과 */
  result: string;
  /** 시도 횟수 */
  attemptCount: number;
  /** 정답 여부 */
  isCorrect: boolean;
};

export const makeGameResult = (result: string, attemptCount: number): GameResult => {
  return {
    result,
    attemptCount,
    isCorrect: false,
  };
};
