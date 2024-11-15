package com.cupofevents.control.ticket;

import com.cupofevents.control.event.EventService;
import com.cupofevents.entity.DTO.EventDTO;
import com.cupofevents.entity.DTO.TicketDTO;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.context.annotation.ApplicationScope;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@ApplicationScope
@AllArgsConstructor
@CrossOrigin(value = {"http://localhost:3000/", "http://192.168.178.254/"})
public class TicketService {

    private final Map<String, SseEmitter> emittersByUserName = new HashMap<>();
    private final TicketRepository ticketRepository;
    private final EventService eventService;

    public Optional<TicketDTO> findTicketForEvent(String userName, String event) {
        return ticketRepository.getTicketForEvent(userName, event);
    }

    public List<TicketDTO> getUserTickets(String userName) {
        Set<String> userTickets = ticketRepository.getUserTickets(userName);
        return userTickets.stream()
                .map(ticketRepository::getTicketForEvent)
                .flatMap(Optional::stream)
                .collect(Collectors.toList());
    }

    public TicketDTO saveTicketPurchaseInQueue(String userName, String eventName) {
        EventDTO event = eventService.getEvent(eventName);

        TicketDTO ticketDto = TicketDTO.builder()
                .userName(userName)
                .data(event.getData())
                .event(event.getName())
                .build();

        ticketRepository.addTicketPurchaseToQueue(ticketDto);
        return ticketDto;
    }

    public Optional<TicketDTO> findTicketInQueue(TicketAsyncEvent ticketAsyncEvent) {
        Optional<TicketDTO> ticketInQueue = ticketRepository.findTicketInQueue();
        if (ticketInQueue.isPresent()) {
            TicketDTO ticketDTO = ticketInQueue.get();
            if (isProperTicket(ticketDTO, ticketAsyncEvent)) {
                return ticketInQueue;
            } else {
                putBackTicketAndScheduleRetry(ticketDTO, ticketAsyncEvent);
            }
        }
        return ticketInQueue;
    }

    private boolean isProperTicket(TicketDTO ticketDTO, TicketAsyncEvent ticketAsyncEvent) {
        return ticketDTO.getUserName().equalsIgnoreCase(ticketAsyncEvent.getUserName()) &&
                normalizeText(ticketDTO.getEvent()).equals(normalizeText(ticketAsyncEvent.getEventName()));
    }

    private String normalizeText(String text) {
        return text.toLowerCase().replace(" ", "");
    }

    private void putBackTicketAndScheduleRetry(TicketDTO ticketDTO, TicketAsyncEvent ticketAsyncEvent) {
        ticketRepository.putBackInQueue(ticketDTO);
        retryTicketProcessing(ticketAsyncEvent);
    }

    @Async
    public void retryTicketProcessing(TicketAsyncEvent ticketAsyncEvent) {
        try {
            Thread.sleep(15000); // Opóźnienie 15 sekund
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        processEventAgain(ticketAsyncEvent);
    }

    private void processEventAgain(TicketAsyncEvent ticketAsyncEvent) {
        Optional<TicketDTO> ticketInQueue = findTicketInQueue(ticketAsyncEvent);
        ticketInQueue.ifPresent(ticketDTO -> processTicketSaveAfterRetry(ticketDTO, ticketAsyncEvent));
    }

    private void processTicketSaveAfterRetry(TicketDTO ticketDTO, TicketAsyncEvent ticketAsyncEvent) {
        saveTicket(ticketAsyncEvent.getUserName(), ticketDTO);
    }

    public void saveTicket(String userName, TicketDTO ticketDTO) {
        ticketRepository.saveTicket(userName, ticketDTO);
    }

}
