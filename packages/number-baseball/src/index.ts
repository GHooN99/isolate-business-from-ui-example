import GameControllerImpl, { type GameController } from './controller/game.controller';
import { type GameConfiguration } from './model/game-configuration';
import { AnswerCheckServiceImpl } from './services/answer-check.impl';
import { AnswerGenerateServiceImpl } from './services/answer-generate.impl';
import { GameEvaluateServiceImpl } from './services/game-evaluate.impl';
import { InputValidateServiceImpl } from './services/input-validate-impl';
import { type RandomService } from './services/interfaces/random.service';
import { OpponentManageServiceImpl } from './services/opponent-manage.impl';
import { RandomServiceImpl } from './services/random.impl';

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

export * from './model/errorss';
export type { GameConfiguration } from './model/game-configuration';
export type { GameResult } from './model/game-result';
export { parseResult } from './utils/parse-result';

export default createGameController;
