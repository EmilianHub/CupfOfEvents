package com.cupofevents.entity.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Builder
@Getter
public class TicketDTO implements Serializable {

    private final String event;
    private final String userName;
    private final String data;
    @Builder.Default
    @Setter
    private String status = "pending";

    public enum TicketStatus {
        PENDING, DONE, FAILED, TIMEOUT
    }
}

