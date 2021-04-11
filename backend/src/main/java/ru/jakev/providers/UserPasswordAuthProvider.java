package ru.jakev.providers;

import io.micronaut.security.authentication.*;
import io.reactivex.Flowable;
import org.reactivestreams.Publisher;
import ru.jakev.entities.User;
import ru.jakev.repositories.UserRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Collections;

@Singleton
public class UserPasswordAuthProvider implements AuthenticationProvider {

    @Inject
    UserRepository userRepository;

    @Override
    public Publisher<AuthenticationResponse> authenticate(AuthenticationRequest authenticationRequest) {
        String username = authenticationRequest.getIdentity().toString();
        String password = authenticationRequest.getSecret().toString();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return Flowable.just(new AuthenticationFailed());
        if (password.equals(user.getPassword())) {
            UserDetails details = new UserDetails(username, Collections.singleton("USER"));
            return Flowable.just(details);
        } else return Flowable.just(new AuthenticationFailed());
    }
}
