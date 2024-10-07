export interface RandomService {
  getRandomNumber(min?: number, max?: number): number;
}

/** 조건에 맞는 랜덤 생성기 구현 */
export default class RandomServiceImpl implements RandomService {
  public getRandomNumber(min = 0, max = 9): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
