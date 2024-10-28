import { GameConfiguration } from '../model/game-configuration';
import { AnswerCheckService } from './interfaces/answer-check.service';

export class AnswerCheckServiceImpl implements AnswerCheckService {
  public constructor(private readonly gameConfiguration: GameConfiguration) {}

  public checkIsCorrect(strikeCount: number): boolean {
    return strikeCount === this.gameConfiguration.digitCount;
  }
}
