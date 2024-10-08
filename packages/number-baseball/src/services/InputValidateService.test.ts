import {
  DuplicateNumberException,
  InvalidInputLengthException,
  InvalidInputTypeException,
} from '../model/Errors';
import { GameConfiguration } from '../model/GameConfiguration';
import InputValidateServiceImpl, { InputValidateService } from './InputValidateService';

describe('InputValidateService 테스트', () => {
  let inputValidateService: InputValidateService;
  let mockGameConfiguration: GameConfiguration;
  const invalidInputLengthExceptionMessage = new InvalidInputLengthException().message;
  const invalidInputTypeExceptionMessage = new InvalidInputTypeException().message;
  const duplicateNumberExceptionMessage = new DuplicateNumberException().message;

  beforeEach(() => {
    mockGameConfiguration = {
      digitCount: 3,
      maxAttemptCount: -1,
      maxNumberOfRange: 9,
      minNumberOfRange: 1,
    };

    inputValidateService = new InputValidateServiceImpl(mockGameConfiguration);
  });

  test('validate 메서드는 입력값이 숫자가 아닐 때 에러를 반환한다.', () => {
    expect(() => inputValidateService.validate('abc')).toThrowError(
      invalidInputTypeExceptionMessage
    );
  });

  test('validate 메서드는 입력값이 게임 설정 자리 수보다 많거나 적을 때 에러를 반환한다.', () => {
    mockGameConfiguration.digitCount = 3;

    expect(() => inputValidateService.validate('1234')).toThrowError(
      invalidInputLengthExceptionMessage
    );

    expect(() => inputValidateService.validate('12')).toThrowError(
      invalidInputLengthExceptionMessage
    );

    mockGameConfiguration.digitCount = 2;
    expect(() => inputValidateService.validate('123')).toThrowError(
      invalidInputLengthExceptionMessage
    );

    expect(() => inputValidateService.validate('1')).toThrowError(
      invalidInputLengthExceptionMessage
    );
  });

  test('validate 메서드는 입력값에 중복된 숫자가 있을 때 에러를 반환한다.', () => {
    expect(() => inputValidateService.validate('555')).toThrowError(
      duplicateNumberExceptionMessage
    );

    expect(() => inputValidateService.validate('177')).toThrowError(
      duplicateNumberExceptionMessage
    );

    expect(() => inputValidateService.validate('121')).toThrowError(
      duplicateNumberExceptionMessage
    );
  });
});
