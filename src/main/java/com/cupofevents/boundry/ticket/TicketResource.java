package com.cupofevents.boundry.ticket;

import com.cupofevents.control.ticket.TicketService;
import com.cupofevents.entity.DTO.TicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/ticket", method = {RequestMethod.GET, RequestMethod.POST})
@CrossOrigin(value = {"http://localhost:3000/", "http://192.168.178.254/"})
public class TicketResource {

    @Autowired
    TicketService ticketService;

    @GetMapping("{userName}/all")
    public List<TicketDTO> getTickets(@PathVariable("userName") String userName) {
        return ticketService.getUserTickets(userName);
    }

    @PostMapping("{userName}/{eventName}")
    public TicketDTO addTicketToQueue(@PathVariable("userName") String userName,
                                 @PathVariable("eventName") String eventName) {
        return ticketService.saveTicketPurchaseInQueue(userName, eventName);
    }

    @GetMapping("single/{userName}/{eventName}")
    public ResponseEntity saveTicket(@PathVariable("userName") String userName,
                                     @PathVariable("eventName") String eventName) {
        Optional<TicketDTO> ticketForEvent = ticketService.findTicketForEvent(userName, eventName);
        if (ticketForEvent.isPresent()) {
            return ResponseEntity.ok().body(ticketForEvent.get());
        }
        return ResponseEntity.notFound().build();
    }
}
