package com.cupofevents.control.ticket;

import com.cupofevents.control.event.EventService;
import com.cupofevents.entity.DTO.EventDTO;
import com.cupofevents.entity.DTO.TicketDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@ApplicationScope
@AllArgsConstructor
public class TicketService {

    private final Map<String, SseEmitter> emittersByUserName = new HashMap<>();
    private final TicketRepository ticketRepository;
    private final EventService eventService;

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

    public SseEmitter getEventListener(String userName) {
        SseEmitter ticketEmitter = new SseEmitter(300000L);
        emittersByUserName.put(userName, ticketEmitter);

        ticketEmitter.onCompletion(() -> emittersByUserName.remove(userName));
        ticketEmitter.onTimeout(() -> emittersByUserName.remove(userName));

        return ticketEmitter;
    }

    public void saveTicketPurchaseInQueue(String userName, String eventName) {
        EventDTO event = eventService.getEvent(eventName);

        TicketDTO ticketDto = TicketDTO.builder()
                .data(event.getData())
                .event(event.getName())
                .build();

        ticketRepository.addTicketPurchaseToQueue(userName, ticketDto);
    }

    public Optional<TicketDTO> findTicketInQueue(String ticketKey) {
        return ticketRepository.findTicketInQueue(ticketKey);
    }

    public void saveTicket(String userName, TicketDTO ticketDTO) {
        ticketRepository.saveTicket(userName, ticketDTO);
    }

    public void sendTicketUpdate(String userName, TicketDTO ticketDTO) {
        SseEmitter emitter = emittersByUserName.get(userName);
        try {
            emitter.send(ticketDTO);
        } catch (IOException e) {
            emittersByUserName.remove(userName);
        }
    }
}
