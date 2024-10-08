import { Mock } from 'vitest';
import { GameConfiguration } from '../model/GameConfiguration';
import { OpponentManageService } from '../services/OpponentManageService';
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

    mockOpponentManageService = {
      init: vi.fn(),
      evaluate: vi.fn(),
      attemptCount: 0,
    };

    gameController = new GameControllerImpl(mockOpponentManageService, mockGameConfiguration);
  });

  describe('start 메서드 테스트', () => {
    test('start 가 호출되지 않을 때 getResult 호출시 에러를 반환한다', () => {
      expect(() => gameController.getResult('123')).toThrowError('Game is not started');
    });

    test('start 가 호출되지 않을 때 restart 호출시 에러를 반환한다', () => {
      expect(() => gameController.restart()).toThrowError('Game is not started');
    });

    test('start 가 호출된 이후 getResult 호출시 정상 동작한다.', () => {
      (mockOpponentManageService.evaluate as Mock).mockReturnValueOnce({ strike: 3, ball: 0 });
      gameController.start();
      expect(() => gameController.getResult('542')).not.toThrow();
    });

    test('start 가 호출된 이후 restart 호출시 정상 동작한다.', () => {
      gameController.start();
      expect(() => gameController.restart()).not.toThrow();
    });
  });

  describe('getResult 메서드 테스트', () => {
    test('start 가 호출된 이후 getResult 호출시 정상 동작한다.', () => {
      (mockOpponentManageService.evaluate as Mock).mockReturnValueOnce({ strike: 3, ball: 0 });
      gameController.start();
      expect(() => gameController.getResult('542')).not.toThrow();
    });
    test('getResult 에 설정된 자리수 와 다른 길이의 문자열을 넘겨주면 에러를 반환한다', () => {
      gameController.start();
      mockGameConfiguration.digitCount = 4;
      expect(() => gameController.getResult('123')).toThrowError('Invalid input length');

      mockGameConfiguration.digitCount = 3;
      expect(() => gameController.getResult('1234')).toThrowError('Invalid input length');
    });

    test("정답이 123 일 때 getResult('321') 을 호출하면 1스트라이크 2볼, 정답 여부 false를 반환한다.", () => {
      (mockOpponentManageService.evaluate as Mock).mockReturnValueOnce({ strike: 1, ball: 2 });

      gameController.start();

      const result = gameController.getResult('321');

      expect(result.result.strike).toBe(1);
      expect(result.result.ball).toBe(2);

      expect(result.isCorrect).toBe(false);
    });

    test("정답이 123 일 때 getResult('123') 을 호출하면 3스트라이크 0볼, 정답 여부 true를 반환한다.", () => {
      (mockOpponentManageService.evaluate as Mock).mockReturnValueOnce({ strike: 3, ball: 0 });

      gameController.start();

      const result = gameController.getResult('123');

      expect(result.result.strike).toBe(3);
      expect(result.result.ball).toBe(0);

      expect(result.isCorrect).toBe(true);
    });
  });

  describe('restart 메서드 테스트', () => {
    test('restart 호출 시 새롭게 게임이 초기화 된다.', () => {
      gameController.start();
      gameController.restart();

      expect(mockOpponentManageService.init).toHaveBeenCalledTimes(2);
    });
  });
});
