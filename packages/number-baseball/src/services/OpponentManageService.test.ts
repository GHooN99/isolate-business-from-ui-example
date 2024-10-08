import { Mock } from 'vitest';
import { AnswerGenerateService } from './AnswerGenerateService';
import { GameEvaluateService } from './GameEvalutateService';
import OpponentManageServiceImpl, { OpponentManageService } from './OpponentManageService';

describe('OpponentManageService 테스트', () => {
  let opponentManageService: OpponentManageService;
  let mockAnswerGenerateService: AnswerGenerateService;
  let mockGameEvaluateService: GameEvaluateService;

  beforeEach(() => {
    mockAnswerGenerateService = {
      generate: vi.fn() as Mock,
    };
    mockGameEvaluateService = {
      evaluate: vi.fn() as Mock,
    };

    opponentManageService = new OpponentManageServiceImpl(
      mockAnswerGenerateService,
      mockGameEvaluateService
    );
  });

  test('init 메서드를 호출한 이후 evaluate 를 호출해야 정상 동작한다. ', () => {
    opponentManageService.init();
    expect(() => opponentManageService.evaluate('123')).not.toThrow();
  });

  test('초기화되지 않은 상태에서 evaluate를 호출하면 예외가 발생한다', () => {
    expect(() => opponentManageService.evaluate('123')).toThrowError('Opponent is not initialized');
  });

  test("evaluate 메서드는 답이 '123' 일 때 '123'을 받으면 3스트라이크를 반환한다", () => {
    (mockGameEvaluateService.evaluate as Mock).mockReturnValueOnce({ strike: 3, ball: 0 });
    opponentManageService.init();

    const result = opponentManageService.evaluate('123');

    expect(result.strike).toBe(3);
  });

  test('evaluate 메서드를 호출하면 상대의 시도 횟수가 증가한다.', () => {
    opponentManageService.init();

    opponentManageService.evaluate('123');
    expect(opponentManageService.attemptCount).toBe(1);

    opponentManageService.evaluate('234');
    expect(opponentManageService.attemptCount).toBe(2);
  });
});
