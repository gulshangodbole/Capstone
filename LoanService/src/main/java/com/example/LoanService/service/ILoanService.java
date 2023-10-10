package com.example.LoanService.service;

import com.example.LoanService.entity.Loan;

import java.util.List;

public interface ILoanService {
    List<Loan> getAllLoans();

    Loan createLoan(Loan support);

    Loan getLoanById(int id);

    List<Loan> getLoanByCustId(int custId);

    Loan updateLoanStatus(int id, String status);

    List<Loan> getLoanByStatus(String status);

    Loan updateDueAmount(int id, int dueAmount);
}
