package com.example.loanapplication.controllers;

import com.example.loanapplication.models.Loan;
import com.example.loanapplication.services.LoanServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {
    @Autowired
    private LoanServiceImpl loanService;

    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loanList = loanService.getAllLoans();
        return new ResponseEntity<>(loanList, HttpStatus.OK);
    }

    @GetMapping("/{custId}")
    public ResponseEntity<List<Loan>> getLoanByCustId(@PathVariable int custId) {
        List<Loan> loan = loanService.getLoanByCustId(custId);
        if (loan != null) {
            return new ResponseEntity<>(loan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Loan>> getLoanByStatus(@PathVariable String status) {
        List<Loan> loans = loanService.getLoanByStatus(status);
        if (loans != null) {
            return new ResponseEntity<>(loans, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{custId}/loan/{loanID}")
    public ResponseEntity<Loan> getLoanById(@PathVariable int custId, @PathVariable int loanID) {
        Loan loan = loanService.getLoanById(loanID);
        if (loan != null) {
            return new ResponseEntity<>(loan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping
    public ResponseEntity<Loan> createLoan(@RequestBody Loan loan) {
        Loan createdLoan = loanService.createLoan(loan);
        return new ResponseEntity<>(createdLoan, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/{status}")
    public ResponseEntity<Loan> updateSupportStatus(@PathVariable int id, @PathVariable String status) {
        Loan updatedLoan = loanService.updateLoanStatus(id, status);
        return new ResponseEntity<>(updatedLoan, HttpStatus.OK);
    }
}
