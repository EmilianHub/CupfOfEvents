package com.cupofevents.control.redis;

import com.cupofevents.entity.DTO.TicketDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    @SuppressWarnings("unchecked")
    public <T> void saveData(String key, T dtoToSave) {
        Map<String, Object> map = objectMapper.convertValue(dtoToSave, Map.class);
        map.forEach((dtoFieldName, dtoValue) -> {
            try {
                redisTemplate.opsForHash().put(key, dtoFieldName, dtoValue);
            } catch (Exception e) {
                log.info("Exception {0}", e);
            }
        });
    }

    public <T> Optional<T> getData(String key, Class<T> targetClass) {
        Map<Object, Object> entries = redisTemplate.opsForHash().entries(key);
        if (entries.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(objectMapper.convertValue(entries, targetClass));
    }

    public Set<String> getKeysByPattern(String pattern) {
        return redisTemplate.keys(pattern);
    }

    public void addToQueue(String key, TicketDTO ticketDTO) {
        redisTemplate.opsForList().leftPush(key, ticketDTO);
    }

    public <T> Optional<T> findInQueue(String key, Class<T> targetClass) {
        Object ticketEntity = redisTemplate.opsForList().rightPop(key);
        return Optional.ofNullable(objectMapper.convertValue(ticketEntity, targetClass));
    }

    public void putBackToQueue(String ticketQueueKey, TicketDTO ticketDTO) {
        redisTemplate.opsForList().rightPush(ticketQueueKey, ticketDTO);
    }

    public void setExpiration(String key, Date expiration) {
        redisTemplate.expireAt(key, expiration);
    }
}
