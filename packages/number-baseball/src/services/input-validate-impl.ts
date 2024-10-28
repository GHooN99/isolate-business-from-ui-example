import {
  DuplicateNumberException,
  InvalidInputLengthException,
  InvalidInputTypeException,
} from '../model/errorss';
import { GameConfiguration } from '../model/game-configuration';
import { InputValidateService } from './interfaces/input-validate.service';

/** @todo 추후 전략 패턴으로 검증과정을 나눌 수 있음 */
export class InputValidateServiceImpl implements InputValidateService {
  public constructor(private readonly gameConfigutation: GameConfiguration) {}

  public validate(input: string): void {
    this.checkInputLength(input);
    this.checkInputType(input);
    this.checkDuplicateNumber(input);
  }

  private checkDuplicateNumber(input: string): void {
    if (new Set(input).size !== input.length) {
      throw new DuplicateNumberException();
    }
  }
  private checkInputType(input: string): void {
    if (!/^\d+$/.test(input)) {
      throw new InvalidInputTypeException();
    }
  }
  private checkInputLength(input: string): void {
    if (input.length !== this.gameConfigutation.digitCount) {
      throw new InvalidInputLengthException();
    }
  }
}
