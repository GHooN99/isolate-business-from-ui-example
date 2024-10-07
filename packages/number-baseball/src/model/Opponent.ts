export interface Opponent {
  get answer(): string;
  get attemptCount(): number;
}

export default class OpponentImpl implements Opponent {
  #attemptCount: number = 0;
  constructor(private readonly _answer: string) {
    this.#attemptCount = 0;
  }

  public get answer(): string {
    return this._answer;
  }
  public get attemptCount(): number {
    return this.#attemptCount;
  }
}
