package com.cupofevents.control.ticket;

import com.cupofevents.control.event.EventService;
import com.cupofevents.entity.DTO.TicketDTO;
import com.cupofevents.infrastructure.mapper.RedisKeyMapper;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.List;
import java.util.Optional;

@Service
@ApplicationScope
@AllArgsConstructor
public class TicketAsyncEventObserver {

    private final TicketService ticketService;

    @EventListener
    public void handleTicketPurchaseEvent(TicketAsyncEvent ticketAsyncEvent) {
        String ticketQueueKey = buildTicketQueue(ticketAsyncEvent);
        Optional<TicketDTO> ticketInQueue = ticketService.findTicketInQueue(ticketQueueKey);
        ticketInQueue.ifPresent(ticket -> saveTicket(ticketAsyncEvent, ticket));
    }

    private void saveTicket(TicketAsyncEvent ticketAsyncEvent, TicketDTO ticketDTO) {
        ticketService.saveTicket(ticketAsyncEvent.getUserName(), ticketDTO);
        ticketService.sendTicketUpdate(ticketAsyncEvent.getUserName(), ticketDTO);
    }

    private String buildTicketQueue(TicketAsyncEvent ticketAsyncEvent) {
        return RedisKeyMapper.from(ticketAsyncEvent.getKeyPrefix(), List.of(ticketAsyncEvent.getUserName(), ticketAsyncEvent.getEventName()));
    }

}
