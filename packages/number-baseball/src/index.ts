import { GameController, GameControllerImpl } from './controller/GameController';
import { GameConfiguration } from './model/GameConfiguration';
import AnswerGenerateServiceImpl from './services/AnswerGenerateService';
import GameEvaluateServiceImpl from './services/GameEvalutateService';
import OpponentManageServiceImpl from './services/OpponentManageService';

const defaultGameConfiguration: GameConfiguration = {
  digitCount: 3,
  maxAttemptCount: -1,
  maxNumberOfRange: 9,
  minNumberOfRange: 0,
};

const createController = (
  gameConfiguration: GameConfiguration = defaultGameConfiguration
): GameController => {
  return new GameControllerImpl(
    new OpponentManageServiceImpl(
      new AnswerGenerateServiceImpl(gameConfiguration),
      new GameEvaluateServiceImpl([])
    )
  );
};

export type { GameConfiguration } from './model/GameConfiguration';
export default createController;
