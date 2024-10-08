import { Mock } from 'vitest';
import createGameController from '.';
import { GameController } from './controller/GameController';
import { RandomService } from './services/RandomService';

describe('숫자야구 게임 모듈 통합 테스트', () => {
  let gameController: GameController;
  let randomService: RandomService;

  const setRandomMockSequence = (sequence: number[]) => {
    sequence.forEach((value) => {
      (randomService.getRandomNumber as Mock).mockReturnValueOnce(value);
    });
  };

  beforeEach(() => {
    randomService = {
      getRandomNumber: vi.fn(),
    };
    gameController = createGameController(
      {
        digitCount: 3,
        maxAttemptCount: -1,
        maxNumberOfRange: 9,
        minNumberOfRange: 1,
      },
      randomService
    );
  });

  test('답이 123이고 한번에 맞춘 케이스', () => {
    setRandomMockSequence([1, 2, 3]);
    gameController.start();

    expect(gameController.getResult('123')).toEqual({
      result: { strike: 3, ball: 0 },
      isCorrect: true,
      attemptCount: 1,
    });
  });

  test('답이 456이고 여러번 시도에 맞춘 케이스', () => {
    setRandomMockSequence([4, 5, 6]);
    gameController.start();

    expect(gameController.getResult('123')).toEqual({
      result: { strike: 0, ball: 0 },
      isCorrect: false,
      attemptCount: 1,
    });

    expect(gameController.getResult('486')).toEqual({
      result: { strike: 2, ball: 0 },
      isCorrect: false,
      attemptCount: 2,
    });

    expect(gameController.getResult('456')).toEqual({
      result: { strike: 3, ball: 0 },
      isCorrect: true,
      attemptCount: 3,
    });
  });

  test('답이 123이고 맞춘 뒤 재시작 (답 345) 케이스', () => {
    setRandomMockSequence([1, 2, 3]);
    gameController.start();

    expect(gameController.getResult('321')).toEqual({
      result: { strike: 1, ball: 2 },
      isCorrect: false,
      attemptCount: 1,
    });

    expect(gameController.getResult('123')).toEqual({
      result: { strike: 3, ball: 0 },
      isCorrect: true,
      attemptCount: 2,
    });

    setRandomMockSequence([3, 4, 5]);
    gameController.restart();

    expect(gameController.getResult('345')).toEqual({
      result: { strike: 3, ball: 0 },
      isCorrect: true,
      attemptCount: 1,
    });
  });
});
