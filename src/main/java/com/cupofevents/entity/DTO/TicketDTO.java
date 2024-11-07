package com.cupofevents.entity.DTO;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TicketDTO {

    private final String event;
    private final String sits;
    private final String data;
}

