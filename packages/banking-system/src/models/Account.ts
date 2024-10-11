export class Account {
  public constructor(
    private _accountNumber: number,
    private _accountHolderName: string,
    private _balance: number
  ) {}

  public get accountNumber(): number {
    return this._accountNumber;
  }

  public get accountHolderName(): string {
    return this._accountHolderName;
  }

  public get balance(): number {
    return this._balance;
  }

  public set balance(balance: number) {
    this._balance = balance;
  }
}
