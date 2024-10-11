import { Account } from '../models/Account';
import { AccountRepository } from '../repository/AccountRepository';

export interface AccountFindService {
  findAccount(accountNumber: number): Account;
}

export class AccountFindServiceImpl implements AccountFindService {
  public constructor(private readonly accountRepository: AccountRepository) {}
  public findAccount(accountNumber: number): Account {
    const account = this.accountRepository.findByAccountNumber(accountNumber);
    if (account === null) {
      throw new Error('Account not found');
    }
    return account;
  }
}
