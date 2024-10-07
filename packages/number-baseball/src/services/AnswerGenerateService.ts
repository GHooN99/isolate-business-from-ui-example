import { GameConfiguration } from '../model/GameConfiguration';

export interface AnswerGenerateService {
  generate(): string;
}

export default class AnswerGenerateServiceImpl implements AnswerGenerateService {
  constructor(private readonly gameConfiguration: GameConfiguration) {}

  public generate(): string {
    // const { digitCount, maxNumberOfRange, minNumberOfRange } =
    //   this.gameConfiguration;

    // const answer = Array.from(
    //   { length: digitCount },
    //   () =>
    //     Math.floor(Math.random() * (maxNumberOfRange - minNumberOfRange + 1)) +
    //     minNumberOfRange
    // ).join("");

    const answer = '123';

    return answer;
  }
}
