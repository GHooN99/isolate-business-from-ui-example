import GameControllerImpl, { GameController } from './controller/GameController';
import { GameConfiguration } from './model/GameConfiguration';
import AnswerCheckServiceImpl from './services/AnswerCheckService';
import AnswerGenerateServiceImpl from './services/AnswerGenerateService';
import GameEvaluateServiceImpl from './services/GameEvalutateService';
import InputValidateServiceImpl from './services/InputValidateService';
import OpponentManageServiceImpl from './services/OpponentManageService';
import RandomServiceImpl, { RandomService } from './services/RandomService';

const defaultGameConfiguration: GameConfiguration = {
  digitCount: 3,
  minNumberOfRange: 0,
  maxNumberOfRange: 9,
  maxAttemptCount: -1,
};

const createOpponentManageService = (
  gameConfiguration: GameConfiguration,
  randomService: RandomService
) => {
  return new OpponentManageServiceImpl(
    new AnswerGenerateServiceImpl(gameConfiguration, randomService),
    new GameEvaluateServiceImpl()
  );
};

const createGameController = (
  gameConfiguration: GameConfiguration = defaultGameConfiguration,
  randomService: RandomService = new RandomServiceImpl()
): GameController =>
  new GameControllerImpl(
    createOpponentManageService(gameConfiguration, randomService),
    new InputValidateServiceImpl(gameConfiguration),
    new AnswerCheckServiceImpl(gameConfiguration)
  );

export * from './model/Errors';
export type { GameConfiguration } from './model/GameConfiguration';
export type { GameResult } from './model/GameResult';
export { parseResult } from './utils/parseResult';

export default createGameController;
