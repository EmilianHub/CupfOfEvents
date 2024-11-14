package com.cupofevents.control.ticket;

import com.cupofevents.entity.DTO.TicketDTO;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class TicketAsyncEvent extends ApplicationEvent {

    private final String eventName;
    private final String userName;
    private final String keyPrefix = "bilet_%s_%s";

    public TicketAsyncEvent(Object source, String eventName, String userName) {
        super(source);
        this.eventName = eventName;
        this.userName = userName;
    }
}
