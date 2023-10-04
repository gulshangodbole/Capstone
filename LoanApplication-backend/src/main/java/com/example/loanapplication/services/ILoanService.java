package com.example.loanapplication.services;

import com.example.loanapplication.models.Loan;

import java.util.List;

interface ILoanService {
    List<Loan> getAllLoans();

    Loan createLoan(Loan support);

    Loan getLoanById(int id);

    List<Loan> getLoanByCustId(int custId);

    Loan updateLoanStatus(int id, String status);

    Loan getLoanByStatus(String status);
}
