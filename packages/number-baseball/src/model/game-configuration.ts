export type GameConfiguration = {
  /** 몇자리 수인지 */
  digitCount: number;
  /** 몇번까지 도전할 수 있는지, -1 일시 inf  */
  maxAttemptCount?: number;
  /** 답의 숫자 최대값 */
  maxNumberOfRange: number;
  /** 답의 숫자 최소값 */
  minNumberOfRange: number;
};
