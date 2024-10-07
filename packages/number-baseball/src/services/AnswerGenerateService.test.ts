import { Mock } from 'vitest';
import { GameConfiguration } from '../model/GameConfiguration';
import AnswerGenerateServiceImpl, { AnswerGenerateService } from './AnswerGenerateService';
import { RandomService } from './RandomService';

describe('AnswerGenerateService 테스트', () => {
  let answerGenerateService: AnswerGenerateService;
  let mockRandomService: RandomService;
  let mockGameConfiguration: GameConfiguration;
  const min = 1;
  const max = 9;

  beforeEach(() => {
    mockGameConfiguration = {
      digitCount: 3,
      maxNumberOfRange: max,
      minNumberOfRange: min,
      maxAttemptCount: -1,
    };

    mockRandomService = {
      getRandomNumber: vi.fn() as Mock,
    };

    answerGenerateService = new AnswerGenerateServiceImpl(mockGameConfiguration, mockRandomService);
  });

  const setupMockRandomSequence = (sequence: number[]) => {
    sequence.forEach((value) => {
      (mockRandomService.getRandomNumber as Mock).mockReturnValueOnce(value);
    });
  };

  const verifyRandomNumberCalls = (callCount: number) => {
    for (let i = 1; i <= callCount; i++) {
      expect(mockRandomService.getRandomNumber).toHaveBeenNthCalledWith(i, min, max);
    }
    expect(mockRandomService.getRandomNumber).toHaveBeenCalledTimes(callCount);
  };

  it('랜덤 함수가 1, 2, 3을 반환하면 generate 메서드는 123을 반환한다', () => {
    setupMockRandomSequence([1, 2, 3]);

    const result = answerGenerateService.generate();

    expect(result).toBe('123');
    expect(result).toHaveLength(mockGameConfiguration.digitCount);

    verifyRandomNumberCalls(3);
  });

  it('랜덤 함수가 1, 2, 1, 4를 반환하면 generate 메서드는 124를 반환한다', () => {
    setupMockRandomSequence([1, 2, 1, 4]);

    const result = answerGenerateService.generate();

    expect(result).toBe('124');
    expect(result).toHaveLength(mockGameConfiguration.digitCount);

    verifyRandomNumberCalls(4);
  });

  it('랜덤 함수가 1, 9, 1, 9, 5 을 반환하면 generate 메서드는 195을 반환한다', () => {
    setupMockRandomSequence([1, 9, 1, 9, 5]);

    const result = answerGenerateService.generate();

    expect(result).toBe('195');
    expect(result).toHaveLength(mockGameConfiguration.digitCount);

    verifyRandomNumberCalls(5);
  });
});
