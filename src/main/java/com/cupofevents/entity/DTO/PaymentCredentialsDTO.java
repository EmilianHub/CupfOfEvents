package com.cupofevents.entity.DTO;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PaymentCredentialsDTO {

    private final String dane;
    private final String csv;
    private final String name;
    private final String surname;

}
