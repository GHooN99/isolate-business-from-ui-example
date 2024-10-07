import { GameConfiguration } from '../model/GameConfiguration';
import { RandomService } from './RandomService';

export interface AnswerGenerateService {
  generate(): string;
}

export default class AnswerGenerateServiceImpl implements AnswerGenerateService {
  public constructor(
    private readonly gameConfiguration: GameConfiguration,
    private readonly randomService: RandomService
  ) {}

  public generate(): string {
    const { digitCount, maxNumberOfRange, minNumberOfRange } = this.gameConfiguration;
    const uniqueNumbers = new Set<string>();

    while (uniqueNumbers.size < digitCount) {
      const random = this.randomService
        .getRandomNumber(minNumberOfRange, maxNumberOfRange)
        .toString();

      uniqueNumbers.add(random);
    }

    return Array.from(uniqueNumbers).join('');
  }
}
