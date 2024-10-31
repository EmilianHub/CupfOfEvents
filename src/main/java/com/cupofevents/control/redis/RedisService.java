package com.cupofevents.control.redis;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

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

}
