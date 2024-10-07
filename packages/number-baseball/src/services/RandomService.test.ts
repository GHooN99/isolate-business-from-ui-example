import RandomServiceImpl, { RandomService } from './RandomService';

describe('RandomService 테스트', () => {
  let randomService: RandomService;

  beforeEach(() => {
    randomService = new RandomServiceImpl();
  });

  test('getRandomNumber메서드는 일정 구간의 랜덤 숫자를 반환한다.', () => {
    const min = 1;
    const max = 10;
    const randomNumber = randomService.getRandomNumber(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });
});
