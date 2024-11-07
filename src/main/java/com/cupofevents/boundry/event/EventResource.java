package com.cupofevents.boundry.event;

import com.cupofevents.control.event.EventService;
import com.cupofevents.entity.DTO.EventDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/event", method = {RequestMethod.GET, RequestMethod.POST})
@CrossOrigin(value = {"http://localhost:3000/", "http://192.168.178.254/"})
public class EventResource {

    @Autowired
    EventService eventService;

    @GetMapping("{eventName}")
    public EventDTO getEvent(@PathVariable("eventName") String eventName) {
        return eventService.getEvent(eventName);
    }

    @GetMapping
    public List<EventDTO> getAvailableEvents() {
        return eventService.getAvailableEvents();
    }
}
