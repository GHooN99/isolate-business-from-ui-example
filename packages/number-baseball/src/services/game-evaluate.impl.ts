import { EvaluatedResult } from '../model/evaluated-result';
import { GameEvaluateService } from './interfaces/game-evaluate.service';

export class GameEvaluateServiceImpl implements GameEvaluateService {
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
