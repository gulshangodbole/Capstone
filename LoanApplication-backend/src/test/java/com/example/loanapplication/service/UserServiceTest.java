package com.example.loanapplication.service;

import com.example.loanapplication.entities.User;
import com.example.loanapplication.exceptions.ResourceNotFoundException;
import com.example.loanapplication.services.IUserService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserServiceTest {
    @Autowired
    IUserService userService;

    @Disabled
    @Test
    void getUserByIdTest() throws ResourceNotFoundException {
        User newUser=userService.getUserById(1L);
        assertEquals("Aditya ",newUser.getFullname());
    }

    @Test
    void updateUserProfileTest() throws ResourceNotFoundException {
        User newUser=new User(1L,"123456","aditya@123","Aditya Mishra");
        User u=userService.updateUserProfile(1L,newUser);
        assertEquals("Aditya Mishra",u.getFullname());
    }

    @Disabled
    @Test
    void getAllUsersTest() {
        List<User> lu =userService.getAllUsers();
        assertEquals(2,lu.size());
    }
    @Test
    void createUserTest(){
        User newU=new User(3L,"1234","shyam@123","Shyam");
        User u=userService.createUser(newU);
        assertEquals("shyam@123",u.getEmail());
    }

    @Test
    void updateUserCreditScoreAndIncomeTest() throws ResourceNotFoundException {
        userService.updateUserCreditScoreAndIncome(2l,751,1200000);
        assertEquals(751,userService.getUserById(2l).getCreditscore());
    }

    @Test
    void getUserByEmailTest() {

        assertEquals("Aditya Mishra",userService.getUserByEmail("aditya@123").getFullname());
    }
}
