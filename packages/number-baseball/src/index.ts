import GameControllerImpl, { GameController } from './controller/GameController';
import { GameConfiguration } from './model/GameConfiguration';

import AnswerGenerateServiceImpl from './services/AnswerGenerateService';
import GameEvaluateServiceImpl from './services/GameEvalutateService';
import OpponentManageServiceImpl from './services/OpponentManageService';
import RandomServiceImpl from './services/RandomService';

const defaultGameConfiguration: GameConfiguration = {
  digitCount: 3,
  minNumberOfRange: 0,
  maxNumberOfRange: 9,
  maxAttemptCount: -1,
};

const createOpponentManageService = (gameConfiguration: GameConfiguration) => {
  return new OpponentManageServiceImpl(
    new AnswerGenerateServiceImpl(gameConfiguration, new RandomServiceImpl()),
    new GameEvaluateServiceImpl()
  );
};

const createGameController = (
  gameConfiguration: GameConfiguration = defaultGameConfiguration
): GameController =>
  new GameControllerImpl(createOpponentManageService(gameConfiguration), gameConfiguration);

export type { GameConfiguration } from './model/GameConfiguration';
export type { GameResult } from './model/GameResult';
export default createGameController;
