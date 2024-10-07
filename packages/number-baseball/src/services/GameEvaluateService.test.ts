import GameEvaluateServiceImpl, { GameEvaluateService } from './GameEvalutateService';

describe('GameEvaluateService 테스트', () => {
  let gameEvaluateService: GameEvaluateService;

  beforeEach(() => {
    gameEvaluateService = new GameEvaluateServiceImpl();
  });

  test("evaluate 메서드는 '123'과 '123'을 받으면 3스트라이크를 반환한다", () => {
    const result = gameEvaluateService.evaluate('123', '123');
    expect(result.strike).toBe(3);
  });

  test("evaluate 메서드는 '123'과 '321'을 받으면 1스트라이크 2볼을 반환한다", () => {
    const result = gameEvaluateService.evaluate('123', '321');
    expect(result.strike).toBe(1);
    expect(result.ball).toBe(2);
  });

  test("evaluate 메서드는 '192'과 '435'을 받으면 0스트라이크 0볼을 반환한다", () => {
    const result = gameEvaluateService.evaluate('192', '435');
    expect(result.strike).toBe(0);
    expect(result.ball).toBe(0);
  });

  test("evaluate 메서드는 '123'과 '312'을 받으면 3볼을 반환한다", () => {
    const result = gameEvaluateService.evaluate('123', '312');
    expect(result.ball).toBe(3);
  });
});
