import { GameController, GameControllerImpl } from './controller/GameController';
import { GameConfiguration } from './model/GameConfiguration';

import AnswerGenerateServiceImpl, { AnswerGenerateService } from './services/AnswerGenerateService';
import GameEvaluateServiceImpl from './services/GameEvalutateService';
import OpponentManageServiceImpl from './services/OpponentManageService';

const defaultGameConfiguration: GameConfiguration = {
  digitCount: 4,
  maxAttemptCount: -1,
  maxNumberOfRange: 9,
  minNumberOfRange: 0,
};

class AnswerGenerateService1 implements AnswerGenerateService {
  public generate(): string {
    return '4258';
  }
}

const createOpponentManageService = (gameConfiguration: GameConfiguration) => {
  return new OpponentManageServiceImpl(new AnswerGenerateService1(), new GameEvaluateServiceImpl());
};

const createGameController = (
  gameConfiguration: GameConfiguration = defaultGameConfiguration
): GameController => {
  return new GameControllerImpl(createOpponentManageService(gameConfiguration), gameConfiguration);
};

export type { GameConfiguration } from './model/GameConfiguration';
export type { GameResult } from './model/GameResult';
export default createGameController;

const gameController = createGameController();

gameController.start();

console.log(gameController.getResult('1253'));
console.log(gameController.getResult('4298'));
console.log(gameController.getResult('5402'));

gameController.restart();
console.log(gameController.getResult('1523'));
console.log(gameController.getResult('5428'));
