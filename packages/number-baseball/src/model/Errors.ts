export class GameNotInitializedException extends Error {
  public constructor() {
    super('Game is not started');
    this.name = 'GameNotInitializedException';
  }
}

export class InvalidInputLengthException extends Error {
  public constructor() {
    super('Invalid input length');
    this.name = 'InvalidInputLengthException';
  }
}

export class InvalidInputTypeException extends Error {
  public constructor() {
    super('Input should be a number');
    this.name = 'InputShouldBeNumberException';
  }
}

export class DuplicateNumberException extends Error {
  public constructor() {
    super('Input should not contain duplicate numbers');
    this.name = 'DuplicateNumberException';
  }
}

export class OpponentNotInitializedException extends Error {
  public constructor() {
    super('Opponent is not initialized');
    this.name = 'OpponentNotInitializedException';
  }
}
