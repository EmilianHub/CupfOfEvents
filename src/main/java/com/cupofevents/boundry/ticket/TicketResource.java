package com.cupofevents.boundry.ticket;

import com.cupofevents.control.ticket.TicketService;
import com.cupofevents.entity.DTO.TicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
