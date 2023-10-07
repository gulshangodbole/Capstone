package com.example.loanapplication.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId; // Primary Key

    private int loanId;
    private int amount;
    private int custId;
    private Date date;

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Payment() {
    }

    public Payment(int paymentId, int loanId, int amount, int custId) {
        this.paymentId = paymentId;
        this.loanId = loanId;
        this.amount = amount;
        this.custId = custId;
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getLoanId() {
        return loanId;
    }

    public void setLoanId(int loanId) {
        this.loanId = loanId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getCustId() {
        return custId;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "paymentId=" + paymentId +
                ", loanId=" + loanId +
                ", amount=" + amount +
                ", custId=" + custId +
                ", date=" + date +
                '}';
    }

    public void setCustId(int custId) {
        this.custId = custId;
    }



}
