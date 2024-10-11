import { Account } from '../models/Account';
import { TransactionDto } from '../models/TransctionDto';
import { AccountRepository } from '../repository/AccountRepository';

export interface TransactionService {
  deposit(transactionDto: TransactionDto): void;
  withdraw(transactionDto: TransactionDto): void;
}

export class TransactionServiceImpl implements TransactionService {
  public constructor(private readonly accountRepository: AccountRepository) {}
  public deposit(transactionDto: TransactionDto): void {
    console.log('Deposited successfully');

    this.accountRepository.updateAccount(account);
  }

  public withdraw(transactionDto: TransactionDto): void {
    console.log('Withdrawn successfully');
  }
}
