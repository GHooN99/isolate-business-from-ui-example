export interface GameEvaluator {
  evaluate(input: string, answer: string): string;
}

export class BallEvaluator implements GameEvaluator {
  public evaluate(input: string, answer: string): string {
    const inputArray = input.split('');
    const answerArray = answer.toString().split('');

    const ballCount = inputArray.filter((inputDigit) => answerArray.includes(inputDigit)).length;

    return `${ballCount}B`;
  }
}

export class StrikeEvaluator implements GameEvaluator {
  public evaluate(input: string, answer: string): string {
    const inputArray = input.split('');
    const answerArray = answer.toString().split('');

    const strikeCount = inputArray.filter(
      (inputDigit, index) => inputDigit === answerArray[index]
    ).length;

    return `${strikeCount}S`;
  }
}
