package com.cupofevents.control.ticket;

import com.cupofevents.control.redis.RedisService;
import com.cupofevents.entity.DTO.TicketDTO;
import com.cupofevents.infrastructure.mapper.RedisKeyMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@ApplicationScope
@AllArgsConstructor
public class TicketRepository {

    private static final String KEY_PATTERN = "bilet_%s_%s";
    private static final String MATCH_ALL_KEY_PATTERN = "*";

    private final RedisService redisService;

    public Set<String> getUserTickets(String user) {
        List<String> keyPatterns = List.of(MATCH_ALL_KEY_PATTERN, user);
        String ticketKeysPattern = RedisKeyMapper.fromKeyPattern(KEY_PATTERN, keyPatterns);
        return redisService.getKeysByPattern(ticketKeysPattern);
    }

    public Optional<TicketDTO> getTicketForEvent(String ticketName) {
        return redisService.getData(ticketName, TicketDTO.class);
    }

}
