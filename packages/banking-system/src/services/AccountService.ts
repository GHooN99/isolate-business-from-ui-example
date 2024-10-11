import { CreateAccountDto } from '../models/CreateAccountDto';
import { AccountRepository } from '../repository/AccountRepository';
import { AccountFindService } from './AccountFindService';

export interface AccountService {
  createAccount(createAccountDto: CreateAccountDto): number;
  checkBalance(accountNumber: number): number;
  checkAccountHolderName(accountNumber: number): string;
}

export class AccountServiceImpl implements AccountService {
  public constructor(
    private readonly accountFindService: AccountFindService,
    private readonly accountRepository: AccountRepository
  ) {}

  public checkBalance(accountNumber: number): number {
    const account = this.accountFindService.findAccount(accountNumber);
    return account.balance;
  }

  public checkAccountHolderName(accountNumber: number): string {
    const account = this.accountFindService.findAccount(accountNumber);
    return account.accountHolderName;
  }

  public createAccount(createAccountDto: CreateAccountDto): number {
    return 123456;
  }
}
