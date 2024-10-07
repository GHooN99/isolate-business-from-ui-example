import { EvaluatedResult } from '../model/EvaluatedResult';

export interface GameEvaluateService {
  evaluate(input: string, answer: string): EvaluatedResult;
}

export default class GameEvaluateServiceImpl implements GameEvaluateService {
  public evaluate(input: string, answer: string): EvaluatedResult {
    const strikeCount = this.getStrikeCount(input, answer);
    const remainString = this.getRemainString(input, answer);
    const ballCount = this.getBallCount(remainString, answer);

    return {
      strike: strikeCount,
      ball: ballCount,
    };
  }

  private getStrikeCount(input: string, answer: string): number {
    return Array.from(input).filter((inputChar, index) => answer[index] === inputChar).length;
  }

  private getRemainString(input: string, answer: string): string {
    return Array.from(input)
      .filter((inputChar, index) => answer[index] !== inputChar)
      .join('');
  }

  private getBallCount(input: string, answer: string): number {
    return Array.from(input).filter((inputChar) => answer.includes(inputChar)).length;
  }
}
