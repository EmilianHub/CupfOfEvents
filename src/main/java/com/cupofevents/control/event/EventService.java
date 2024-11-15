package com.cupofevents.control.event;

import com.cupofevents.entity.DTO.EventDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@ApplicationScope
@AllArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public EventDTO getEvent(String eventName) {
        return eventRepository.requireEvent(eventName.toLowerCase());
    }

    public List<EventDTO> getAvailableEvents() {
        Set<String> availableEvents = eventRepository.getAvailableEvents();
        return availableEvents.stream()
                .map(eventRepository::requireEvent)
                .collect(Collectors.toList());
    }
}
