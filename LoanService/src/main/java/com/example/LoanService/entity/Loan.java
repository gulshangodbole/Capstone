package com.example.LoanService.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int custId;
    private int loanAmount;
    private int loanTerm;
    private String loanPurpose;
    private String loanType;
    @Column(columnDefinition = "varchar(255) default 'Pending'")
    private String status;
    private int dueAmount;
    private Date date;

    public Loan(int id, int custId, int loanAmount, int loanTerm, String loanPurpose, String loanType, String status, int dueAmount) {
        this.id = id;
        this.custId = custId;
        this.loanAmount = loanAmount;
        this.loanTerm = loanTerm;
        this.loanPurpose = loanPurpose;
        this.loanType = loanType;
        this.status = status;
        this.dueAmount = dueAmount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustId() {
        return custId;
    }

    public void setCustId(int custId) {
        this.custId = custId;
    }

    public int getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(int loanAmount) {
        this.loanAmount = loanAmount;
    }

    public int getLoanTerm() {
        return loanTerm;
    }

    public void setLoanTerm(int loanTerm) {
        this.loanTerm = loanTerm;
    }

    public String getLoanPurpose() {
        return loanPurpose;
    }

    public void setLoanPurpose(String loanPurpose) {
        this.loanPurpose = loanPurpose;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getDueAmount() {
        return dueAmount;
    }

    public void setDueAmount(int dueAmount) {
        this.dueAmount = dueAmount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}