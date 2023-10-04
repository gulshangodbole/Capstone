package com.example.loanapplication.controllers;

import com.example.loanapplication.models.Support;
import com.example.loanapplication.services.SupportServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.loanapplication.entities.User;
import com.example.loanapplication.exceptions.ResourceNotFoundException;
import com.example.loanapplication.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {


    @Autowired
    private UserService userService;



    @GetMapping("/users")
    public List < User > getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    @ResponseBody
    public Object login(@Valid @RequestBody User user) {
        return userService.login(user);
    }

    @PostMapping("/register")
    @ResponseBody
    public Object register(@Valid @RequestBody User user)
    {
        return userService.register(user);
    }

    @DeleteMapping("/user/{id}")
    public Map<String,String> deleteEmp(@PathVariable String id) throws ResourceNotFoundException
    {
        return userService.deleteEmp(id);
    }

}
