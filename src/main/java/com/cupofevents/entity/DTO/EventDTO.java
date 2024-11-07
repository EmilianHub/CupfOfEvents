package com.cupofevents.entity.DTO;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EventDTO {

    private final String name;
    private final String price;
    private final String data;
    private final String availableSits;
    private final String age;
    private final String place;
}
