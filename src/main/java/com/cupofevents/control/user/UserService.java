package com.cupofevents.control.user;

import com.cupofevents.entity.DTO.UserDTO;
import com.cupofevents.infrastructure.exceptions.CustomExceptionBuilder;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@ApplicationScope
public class UserService {

    private final static String POSITIVE = "POSITIVE";
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final Pattern EMAIL_SYNTAX = Pattern.compile("[/!#$%^&*()/]");

    public String saveUser(UserDTO user) {
        verifyLoginAndEmailPresence(user);
        verifyHasloPresence(user);

        String encryptedPassword = passwordEncoder.encode(user.getHaslo());
        user.setHaslo(encryptedPassword);

        userRepo.create(user);

        return POSITIVE;
    }

    public String getUser(String login, String haslo) {
        Optional<UserDTO> uzytkownikJPA = userRepo.findWithLogin(login);
        if (uzytkownikJPA.isPresent()) {
            if (passwordEncoder.matches(haslo, uzytkownikJPA.get().getHaslo())) {
                return uzytkownikJPA.get().getImie();
            }
        }
        return "";
    }

    private void verifyLoginAndEmailPresence(UserDTO uzytkownik) {
        if (Strings.isEmpty(uzytkownik.getEmail())) {
            throw CustomExceptionBuilder.getCustomException(HttpStatus.BAD_REQUEST, "Email is empty");
        }
        if (Strings.isEmpty(uzytkownik.getLogin())) {
            throw CustomExceptionBuilder.getCustomException(HttpStatus.BAD_REQUEST, "Login is empty");
        }

        verifyEmailSyntax(uzytkownik.getEmail());
    }

    private void verifyHasloPresence(UserDTO uzytkownik) {
        if (Strings.isEmpty(uzytkownik.getHaslo())) {
            throw CustomExceptionBuilder.getCustomException(HttpStatus.BAD_REQUEST, "Haslo is empty");
        }
    }

    private void verifyEmailSyntax(String email) {
        if (EMAIL_SYNTAX.matcher(email).find()) {
            throw CustomExceptionBuilder.getCustomException(HttpStatus.BAD_REQUEST, "Wrong email syntax");
        }
    }

}
