"use strict";

class Transaction {
  constructor(amount, payee) {
    this.date = new Date();
    this.amount = amount;
    this.payee = payee;
  }
}

class BankAccount {
  constructor(accountNumber, owner) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.transactions = [];
  }

  balance() {
    return this.transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }

  deposit(amt) {
    if (amt <= 0) {
      console.log("Deposit amount must be positive");
      return;
    }
    const depositTransaction = new Transaction(amt, "Deposit");
    this.transactions.push(depositTransaction);
  }

  charge(payee, amt) {
    if (amt <= 0) {
      console.log("Charge amount must be positive");
      return;
    }
    if (this.balance() - amt < 0) {
      console.log("Insufficient funds for this charge");
      return;
    }
    const chargeTransaction = new Transaction(-amt, payee);
    this.transactions.push(chargeTransaction);
  }
}

// Example usage:
const account = new BankAccount("123456", "John Doe");
account.deposit(100);
account.charge("Grocery Store", 25);
console.log(account.balance()); // 75
account.charge("Gas Station", 50);
console.log(account.balance()); // 25
account.charge("Electronics Store", 30); // Insufficient funds for this charge
console.log(account.balance()); // 25
