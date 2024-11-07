package com.cupofevents.boundry.user;

import com.cupofevents.control.user.UserService;
import com.cupofevents.entity.DTO.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/uzytkownik", method = {RequestMethod.GET, RequestMethod.POST})
@CrossOrigin(value = {"http://localhost:3000/", "http://192.168.178.254/"})
public class UserResource {

    @Autowired
    UserService userService;

    @PostMapping("/rejestracja")
    public String rejestracja(@RequestBody UserDTO user)
    {
        return userService.saveUser(user);
    }

    @PostMapping("/logowanie")
    public String login (@RequestParam("login") String login,
                         @RequestParam("haslo") String haslo)
    {
        return userService.getUser(login,haslo);
    }

}
