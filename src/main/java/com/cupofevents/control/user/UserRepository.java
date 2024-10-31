package com.cupofevents.control.user;

import com.cupofevents.control.redis.RedisService;
import com.cupofevents.entity.DTO.UserDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserRepository {

    private final static String USER_PREFIX = "user_";

    private final RedisService redisService;

    public void create(UserDTO userDTO) {
        userDTO.setUuid(UUID.randomUUID().toString());
        String key = buildKey(userDTO.getImie());
        redisService.saveData(key, userDTO);
    }

    public Optional<UserDTO> findWithLogin(String login) {
        String key = buildKey(login);
        return redisService.getData(key, UserDTO.class);
    }

    private String buildKey(String value) {
        return USER_PREFIX + value.toLowerCase().trim();
    }
}
