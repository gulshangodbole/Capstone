package com.example.loanapplication.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Date;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
    
    private String email;
    private String fullname;
    private String address;
    private String contact;
    private String gender;
    private Date dob;
    private String employment;
    private int empYears;
    private Long income;
    private Long savings;
    private Long expense;
    private String assets;
    private int creditscore;
    private String eligibility;

    public User() {}

    public User(Long userID, String password, String email,String fullname) {
        this.userID = userID;
        this.password = password;
        this.email = email;
        this.fullname = fullname;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getEmployment() {
        return employment;
    }

    public void setEmployment(String employment) {
        this.employment = employment;
    }

    public int getEmpYears() {
        return empYears;
    }

    public void setEmpYears(int empYears) {
        this.empYears = empYears;
    }

    public Long getIncome() {
        return income;
    }

    public void setIncome(Long income) {
        this.income = income;
    }

    public Long getSavings() {
        return savings;
    }

    public void setSavings(Long savings) {
        this.savings = savings;
    }

    public Long getExpense() {
        return expense;
    }

    public void setExpense(Long expense) {
        this.expense = expense;
    }

    public String getAssets() {
        return assets;
    }

    public void setAssets(String assets) {
        this.assets = assets;
    }

    public int getCreditscore() {
        return creditscore;
    }

    public void setCreditscore(int creditscore) {
        this.creditscore = creditscore;
    }

    public String getEligibility() {
        return eligibility;
    }

    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }
}
