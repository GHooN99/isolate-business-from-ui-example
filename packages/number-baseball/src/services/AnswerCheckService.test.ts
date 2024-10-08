import { GameConfiguration } from '../model/GameConfiguration';
import AnswerCheckServiceImpl, { AnswerCheckService } from './AnswerCheckService';

describe('AnswerCheckService 테스트', () => {
  let answerCheckService: AnswerCheckService;
  let mockGameConfiguration: GameConfiguration;

  beforeEach(() => {
    mockGameConfiguration = {
      digitCount: 3,
      maxAttemptCount: -1,
      maxNumberOfRange: 9,
      minNumberOfRange: 1,
    };

    answerCheckService = new AnswerCheckServiceImpl(mockGameConfiguration);
  });

  test('checkIsCorrect 메서드는 정답을 맞췄을 때(스트라이크 수가 게임설정 자리수와 같을 때) true를 반환한다.', () => {
    expect(answerCheckService.checkIsCorrect(3)).toBe(true);
    mockGameConfiguration.digitCount = 4;
    expect(answerCheckService.checkIsCorrect(4)).toBe(true);
  });

  test('checkIsCorrect 메서드는 정답을 맞추지 못했을 때(스트라이크 수가 게임설정 자리수와 다를 때) false를 반환한다.', () => {
    expect(answerCheckService.checkIsCorrect(0)).toBe(false);
    mockGameConfiguration.digitCount = 4;
    expect(answerCheckService.checkIsCorrect(1)).toBe(false);
  });
});
