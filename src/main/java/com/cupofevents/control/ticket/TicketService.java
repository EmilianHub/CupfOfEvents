package com.cupofevents.control.ticket;

import com.cupofevents.control.redis.RedisService;
import com.cupofevents.entity.DTO.TicketDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@ApplicationScope
@AllArgsConstructor
public class TicketService {

    private static final String TICKET_PREFIX = "bilet_";

    private final TicketRepository ticketRepository;

    public Optional<TicketDTO> findTicketForEvent(String userName, String event) {
        Set<String> userTickets = ticketRepository.getUserTickets(userName);
        Optional<String> ticketForEvent = userTickets.stream()
                .filter(userTicket -> userTicket.contains(event))
                .findFirst();
        return ticketForEvent.flatMap(ticketRepository::getTicketForEvent);
    }

    public List<TicketDTO> getUserTickets(String userName) {
        Set<String> userTickets = ticketRepository.getUserTickets(userName);
        return userTickets.stream()
                .map(ticketRepository::getTicketForEvent)
                .flatMap(Optional::stream)
                .collect(Collectors.toList());
    }
}
