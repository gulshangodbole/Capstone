package com.example.loanapplication.services;

import com.example.loanapplication.models.Loan;
import com.example.loanapplication.repositories.LoanRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoanServiceImpl implements ILoanService{
    @Autowired
    private LoanRepository loanRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Loan createLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    public Loan getLoanById(int id) {
        return loanRepository.findById(id).orElse(null);
    }

    @Override
    public Loan getLoanByCustId(int custId) {
        return loanRepository.findByCustId(custId);
    }

    @Override
    public Loan getLoanByStatus(String status) {
        return loanRepository.findByStatus(status);
    }

    @Override
    public Loan updateLoanStatus(int id, String status) {
        Optional<Loan> optionalSupport = loanRepository.findById(id);

        if (optionalSupport.isPresent()) {
            Loan loan = optionalSupport.get();

            // Update the status
            loan.setStatus(status);

            // Save the updated support request to the database
            return loanRepository.save(loan);
        } else {
            // Handle the case where the support request is not found
            throw new EntityNotFoundException("Loan request with ID " + id + " not found");
        }
    }
}
