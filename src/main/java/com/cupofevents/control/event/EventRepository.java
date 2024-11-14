package com.cupofevents.control.event;

import com.cupofevents.control.redis.RedisService;
import com.cupofevents.entity.DTO.EventDTO;
import com.cupofevents.infrastructure.exceptions.CustomExceptionBuilder;
import com.cupofevents.infrastructure.mapper.RedisKeyMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.Collections;
import java.util.Set;

@Service
@ApplicationScope
@AllArgsConstructor
public class EventRepository {

    private static final String KEY_PATTERN = "event_%s";
    private static final String MATCH_ALL_KEY_PATTERN = "*";

    private final RedisService redisService;

    public EventDTO requireEvent(String eventName) {
        return redisService.getData(eventName, EventDTO.class)
                .orElseThrow(() -> CustomExceptionBuilder.getCustomException(HttpStatus.UNPROCESSABLE_ENTITY,
                "Event with this name was expected to exist"));
    }

    public Set<String> getAvailableEvents() {
        String eventKeyPattern = RedisKeyMapper.from(KEY_PATTERN, Collections.singletonList(MATCH_ALL_KEY_PATTERN));
        return redisService.getKeysByPattern(eventKeyPattern);
    }
}
