package com.example.loanapplication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.loanapplication.repositories.UserRepository;


import com.example.loanapplication.entities.User;

import com.example.loanapplication.exceptions.ResourceNotFoundException;
//import com.capstone.backend.exceptions.TableEmptyException;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;


@Service
public class UserService implements  IUserService{

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Map<String, String> deleteUser(Long id) throws ResourceNotFoundException {
        Map<String, String> object = new HashMap<>();
        User e = userRepository.findById(id).orElse(null);
        if (e == null) {
            throw new ResourceNotFoundException("User with the given ID does not exist");
        } else {
            userRepository.deleteById(id);
            object.put("statusCode", "200");
            object.put("message", "User deleted successfully");
        }
        return object;
    }

    public User getUserById(Long id) throws ResourceNotFoundException {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }

    public User updateUserProfile(Long id, User updatedUser) throws ResourceNotFoundException {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Update user profile fields
            user.setFullname(updatedUser.getFullname());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            //user.setUserID(updatedUser.getUserID());
            user.setAddress(updatedUser.getAddress());
            user.setContact(updatedUser.getContact());
            user.setGender(updatedUser.getGender());
            user.setDob(updatedUser.getDob());
            user.setEmployment(updatedUser.getEmployment());
            user.setEmpYears(updatedUser.getEmpYears());
            user.setAssets(updatedUser.getAssets());
            user.setPassword(updatedUser.getPassword());
            // user.setIncome(updatedUser.getIncome());
            // user.setCreditscore(updatedUser.getCreditscore());
            // Add other fields as needed

            // Save the updated user profile
            return userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public User updateUserCreditScoreAndIncome(Long userId, int creditscore, long income) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            user.setCreditscore(creditscore);
            user.setIncome(income);
            // Update other fields if needed

            return userRepository.save(user);
        }

        return user;
    }

     public User updateUserExpenseSavings(Long userId, long expense, long savings) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null) {
            user.setExpense(expense);
            user.setSavings(savings);
            // Update other fields if needed

            return userRepository.save(user);
        }
        return user;
    }

    // public Map<String, Object> login(User user) {
    //     Map<String, Object> object = new HashMap<>();
    //     User user1 = userRepository.findById(user.getUserID()).orElse(null);
    //     User admin = userRepository.findById(123456L).get();
    //     Pattern pattern = Pattern.compile("\\d", Pattern.CASE_INSENSITIVE);
    //     Matcher matcher = pattern.matcher((String.valueOf(user.getUserID())));

    //     if (matcher.matches()) {
    //         if (user1 == null) {
    //             object.put("authStatus", false);
    //             object.put("role", null);
    //             return object;
    //         }

    //         if (user.getUserID() == 123456) {
    //             if (StringUtils.equals(user.getPassword(), admin.getPassword())) {
    //                 object.put("authStatus", true);
    //                 object.put("role", "admin");
    //                 object.put("name", admin.getName());
    //                 object.put("email", admin.getEmail());
    //             } else {
    //                 object.put("authStatus", false);
    //                 object.put("role", "admin");
    //             }
    //         } else {
    //             if (StringUtils.equals(user1.getPassword(), user.getPassword())) {
    //                 object.put("authStatus", true);
    //                 object.put("role", "user");
    //                 object.put("name", user1.getName());
    //                 object.put("email", user1.getEmail());
    //             } else {
    //                 object.put("authStatus", false);
    //                 object.put("role", "user");
    //             }
    //         }
    //         return object;
    //     } else {
    //         object.put("authStatus", false);
    //         object.put("role", null);
    //         return object;
    //     }
    // }

    // public Map<String, Object> register(User user) {
    //     Pattern pattern = Pattern.compile("\\d", Pattern.CASE_INSENSITIVE);
    //     Matcher matcher = pattern.matcher(String.valueOf(user.getUserID()));
    //     Map<String, Object> object = new HashMap<>();
    //     if (matcher.matches()) {
    //         User user1 = userRepository.findById(user.getUserID()).orElse(null);
    //         if (user1 == null) {
    //             object.put("availStatus", true);
    //             userRepository.save(user);
    //             object.put("name", user.getName());
    //             object.put("email", user.getEmail());
    //             return object;
    //         } else {
    //             object.put("availStatus", false);
    //             return object;
    //         }
    //     } else {
    //         object.put("availStatus", false);
    //         return object;
    //     }
    // }
}