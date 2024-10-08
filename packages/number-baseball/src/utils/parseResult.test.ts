import { parseResult } from './parseResult';

describe('parseResult 테스트', () => {
  const resultSet = [
    { result: { strike: 3, ball: 0 }, text: '3스트라이크' },
    { result: { strike: 0, ball: 3 }, text: '3볼' },
    { result: { strike: 2, ball: 1 }, text: '1볼 2스트라이크' },
    { result: { strike: 1, ball: 2 }, text: '2볼 1스트라이크' },
    { result: { strike: 1, ball: 0 }, text: '1스트라이크' },
    { result: { strike: 0, ball: 0 }, text: '낫싱' },
    { result: { strike: 0, ball: 1 }, text: '1볼' },
  ];

  test('입력받은 결과를 한국어 결과로 변환한다.', () => {
    resultSet.forEach(({ result, text }) => {
      expect(parseResult({ result, attemptCount: 0, isCorrect: false })).toBe(text);
    });
  });
});
