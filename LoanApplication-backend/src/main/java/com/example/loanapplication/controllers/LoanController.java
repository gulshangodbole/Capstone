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

    @GetMapping("/{id}")
    public ResponseEntity<Loan> getLoanByCustId(@PathVariable int id) {
        Loan loan = loanService.getLoanByCustId(id);
        if (loan != null) {
            return new ResponseEntity<>(loan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Loan> getLoanByStatus(@PathVariable String status) {
        Loan loan = loanService.getLoanByStatus(status);
        if (loan != null) {
            return new ResponseEntity<>(loan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/loan/{loanID}")
    public ResponseEntity<Loan> getLoanById(@PathVariable int id, @PathVariable int loanID) {
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

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Loan> updateSupportStatus(@PathVariable int id, @PathVariable String status) {
        Loan updatedLoan = loanService.updateLoanStatus(id, status);
        return new ResponseEntity<>(updatedLoan, HttpStatus.OK);
    }
}
