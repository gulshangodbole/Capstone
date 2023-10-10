package com.example.UserService.service;

import com.example.UserService.entity.User;
import com.example.UserService.exceptions.ResourceNotFoundException;
import com.example.UserService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

}
