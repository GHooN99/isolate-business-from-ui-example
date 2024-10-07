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

  test('init 메서드를 호출하면 Oppenent 는 새로운 숫자를 생성하며 초기화 된다 ', () => {
    opponentManageService.init();
    expect(mockAnswerGenerateService.generate).toHaveBeenCalled();
  });

  test('초기화되지 않은 상태에서 evaluate를 호출하면 예외가 발생한다', () => {
    expect(() => opponentManageService.evaluate('123')).toThrowError('Opponent is not initialized');
  });

  test('evaluate 메서드를 호출하면 상대의 숫자와 인자값을 비교한다.', () => {
    (mockAnswerGenerateService.generate as Mock).mockImplementationOnce(() => '567');
    opponentManageService.init();

    opponentManageService.evaluate('123');

    expect(mockGameEvaluateService.evaluate).toHaveBeenCalledWith('123', '567');
  });

  test('evaluate 메서드를 호출하면 상대의 시도 횟수가 증가한다.', () => {
    opponentManageService.init();
    opponentManageService.evaluate('123');
    expect(opponentManageService.attemptCount).toBe(1);
    opponentManageService.evaluate('234');
    expect(opponentManageService.attemptCount).toBe(2);
  });
});
