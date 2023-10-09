package com.example.loanapplication.services;

import com.example.loanapplication.entities.User;
import com.example.loanapplication.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Map;

public interface IUserService {
    List<User> getAllUsers();

    User createUser(User user);

     Map<String, String> deleteUser(Long id) throws ResourceNotFoundException;

    User getUserById(Long id) throws ResourceNotFoundException;

    User updateUserProfile(Long id, User updatedUser) throws ResourceNotFoundException;

    User getUserByEmail(String email);

    User updateUserCreditScoreAndIncome(Long userId, int creditscore, long income);
}
