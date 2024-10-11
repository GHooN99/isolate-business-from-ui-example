import { CreateAccountDto } from '../models/CreateAccountDto';
import { TransactionDto } from '../models/TransctionDto';
import { AccountService } from './AccountService';
import { TransactionService } from './TransctionService';

export interface BankingService {
  createAccount(CreateAccountDto: CreateAccountDto): number;
  deposit(transactionDto: TransactionDto): void;
  withdraw(transactionDto: TransactionDto): void;
  checkBalance(accountNumber: number): number;
  checkAccountHolderName(accountNumber: number): string;
}

export class BankingServiceImpl implements BankingService {
  public constructor(
    private readonly accountService: AccountService,
    private readonly transactionService: TransactionService
  ) {}

  public createAccount(createAccountDto: CreateAccountDto): number {
    return this.accountService.createAccount(createAccountDto);
  }

  public checkBalance(accountNumber: number): number {
    return this.accountService.checkBalance(accountNumber);
  }

  public checkAccountHolderName(accountNumber: number): string {
    return this.accountService.checkAccountHolderName(accountNumber);
  }

  public deposit(transactionDto: TransactionDto): void {
    this.transactionService.deposit(transactionDto);
  }

  public withdraw(transactionDto: TransactionDto): void {
    this.transactionService.withdraw(transactionDto);
  }
}
