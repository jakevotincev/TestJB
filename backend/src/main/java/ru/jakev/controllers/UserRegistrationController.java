package ru.jakev.controllers;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import ru.jakev.entities.User;
import ru.jakev.repositories.UserRepository;

import javax.inject.Inject;

@Controller("/register")
@Secured(SecurityRule.IS_ANONYMOUS)
public class UserRegistrationController {
    @Inject
    UserRepository userRepository;

    @Post
    public HttpResponse<?> register(@Body User user){
        if (userRepository.findByUsername(user.getUsername()).isEmpty()){
            userRepository.save(user);
            return HttpResponse.status(HttpStatus.OK);
        }else return HttpResponse.status(HttpStatus.CONFLICT).body("Username: " + user.getUsername() + " already exists");

    }

}
