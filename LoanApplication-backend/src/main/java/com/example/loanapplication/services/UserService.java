
package com.example.loanapplication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loanapplication.repositories.UserRepository;


import com.example.loanapplication.entities.User;

import com.example.loanapplication.exceptions.ResourceNotFoundException;
//import com.capstone.backend.exceptions.TableEmptyException;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

import java.util.Map;
import java.util.HashMap;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService() {
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Map<String, Object> login(User user) {
        Map<String, Object> object = new HashMap<>();
        User user1 = userRepository.findById(user.getUserID()).orElse(null);
        User admin = userRepository.getReferenceById("K123456");
        Pattern pattern = Pattern.compile("[a-z]\\d\\d\\d\\d\\d\\d", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(user.getUserID());

        if (matcher.matches()) {
            if (user1 == null) {
                object.put("authStatus", false);
                object.put("role", null);
                return object;
            }

            if (StringUtils.equalsIgnoreCase(user.getUserID(), "K123456")) {
                if (StringUtils.equals(user.getPassword(), admin.getPassword())) {
                    object.put("authStatus", true);
                    object.put("role", "admin");
                    object.put("name", admin.getName());
                    object.put("email", admin.getEmail());
                } else {
                    object.put("authStatus", false);
                    object.put("role", "admin");
                }
            } else {
                if (StringUtils.equals(user1.getPassword(), user.getPassword())) {
                    object.put("authStatus", true);
                    object.put("role", "user");
                    object.put("name", user1.getName());
                    object.put("email", user1.getEmail());
                } else {
                    object.put("authStatus", false);
                    object.put("role", "user");
                }
            }
            return object;
        } else {
            object.put("authStatus", false);
            object.put("role", null);
            return object;
        }
    }

    public Map<String, Object> register(User user) {
        Pattern pattern = Pattern.compile("[a-z]\\d\\d\\d\\d\\d\\d", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(user.getUserID());
        Map<String, Object> object = new HashMap<>();
        if (matcher.matches()) {
            User user1 = userRepository.findById(user.getUserID()).orElse(null);
            if (user1 == null) {
                object.put("availStatus", true);
                userRepository.save(user);
                object.put("name", user.getName());
                object.put("email", user.getEmail());
                return object;
            } else {
                object.put("availStatus", false);
                return object;
            }
        } else {
            object.put("availStatus", false);
            return object;
        }
    }

    public Map<String, String> deleteEmp(String id) throws ResourceNotFoundException {
        Map<String, String> object = new HashMap<>();
        User e = userRepository.findById(id).orElse(null);
        if (e == null) {
            throw new ResourceNotFoundException("User with the given ID does not exist");
        } else {
            userRepository.deleteById(id);
            object.put("statusCode", "200");
            object.put("message", "Employee deleted successfully");
        }
        return object;
    }

    public User getUserById(String id) throws ResourceNotFoundException {
        Optional<User> userOptional = userRepository.findById(String.valueOf(id));
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }

    public User updateUserProfile(String id, User updatedUser) throws ResourceNotFoundException {
        Optional<User> userOptional = userRepository.findById(String.valueOf(id));
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Update user profile fields
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setUserID(updatedUser.getUserID());
            // Add other fields as needed

            // Save the updated user profile
            return userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }
}
