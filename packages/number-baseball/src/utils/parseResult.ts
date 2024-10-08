import { GameResult } from '../model/GameResult';

export const parseResult = ({ result }: GameResult) => {
  if (result.strike === 0 && result.ball === 0) {
    return '낫싱';
  }
  if (result.strike === 0) {
    return `${result.ball}볼`;
  }
  if (result.ball === 0) {
    return `${result.strike}스트라이크`;
  }

  return `${result.ball}볼 ${result.strike}스트라이크`;
};
