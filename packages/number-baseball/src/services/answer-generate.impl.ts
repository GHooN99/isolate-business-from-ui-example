import { GameConfiguration } from '../model/game-configuration';
import { AnswerGenerateService } from './interfaces/answer-generate.service';
import { RandomService } from './interfaces/random.service';

export class AnswerGenerateServiceImpl implements AnswerGenerateService {
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
