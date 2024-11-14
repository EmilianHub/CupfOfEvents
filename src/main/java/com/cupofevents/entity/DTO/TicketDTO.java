package com.cupofevents.entity.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
public class TicketDTO {

    private final String event;
    private final String sits;
    private final String data;
    @Builder.Default
    @Setter
    private String status = "pending";

    public enum TicketStatus {
        PENDING, DONE, FAILED
    }
}

