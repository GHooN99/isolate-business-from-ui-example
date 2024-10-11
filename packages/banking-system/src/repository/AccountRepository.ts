import { Account } from '../models/Account';

type Nullable<T> = T | null;
export interface AccountRepository {
  createAccount(): void;
  updateAccount(): void;
  findByAccountNumber(accountNumber: number): Nullable<Account>;
  findAll(): Account[];
}

export class AccountRepositoryImpl implements AccountRepository {
  public constructor() {}

  public createAccount(): void {
    console.log('Account created successfully');
  }

  public updateAccount(): void {
    console.log('Account updated successfully');
  }

  public findByAccountNumber(): Nullable<Account> {
    return new Account(123456, 'John Doe', 1000);
  }

  public findAll(): Account[] {
    return [new Account(123456, 'John Doe', 1000)];
  }
}
