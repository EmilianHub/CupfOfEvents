package com.cupofevents.entity.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserDTO {
    private String uuid;
    private String imie;
    private String nazwisko;
    private String email;
    private String haslo;
    private String login;
}
