import { GameConfiguration } from '../model/GameConfiguration';
import OpponentManageService from '../services/OpponentManageService';
import GameControllerImpl, { GameController } from './GameController';

describe('GameController 테스트', () => {
  let gameController: GameController;
  let mockGameConfiguration: GameConfiguration;
  let mockOpponentManageService: OpponentManageService;

  beforeEach(() => {
    mockGameConfiguration = {
      digitCount: 3,
      maxAttemptCount: -1,
      maxNumberOfRange: 9,
      minNumberOfRange: 1,
    };

    mockOpponentManageService = {};
    gameController = new GameControllerImpl(mockOpponentManageService, mockGameConfiguration);
  });

  test('start 는 게임을 시작하는 메서드고 ', () => {
    gameController.start();
    expect(mockOpponentManageService.init).toHaveBeenCalled();
  });

  test('start 가 호출되지 않을 때 getGameResult 호출시 에러를 반환한다', () => {
    expect(() => gameController.getResult('123')).toThrowError('Game is not started');
  });

  test('start 가 호출되지 않을 때 restart 호출시 에러를 반환한다', () => {
    expect(() => gameController.restart()).toThrowError('Game is not started');
  });
});
