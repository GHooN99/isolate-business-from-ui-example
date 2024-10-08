import { GameConfiguration } from '../model/GameConfiguration';

export interface AnswerCheckService {
  checkIsCorrect(strikeCount: number): boolean;
}

export default class AnswerCheckServiceImpl implements AnswerCheckService {
  public constructor(private readonly gameConfiguration: GameConfiguration) {}

  public checkIsCorrect(strikeCount: number): boolean {
    return strikeCount === this.gameConfiguration.digitCount;
  }
}
