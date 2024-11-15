package com.cupofevents.control.user;

import com.cupofevents.control.redis.RedisService;
import com.cupofevents.entity.DTO.UserDTO;
import com.cupofevents.infrastructure.mapper.RedisKeyMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserRepository {

    private final static String USER_PREFIX = "user_%s";

    private final RedisService redisService;

    public void create(UserDTO userDTO) {
        userDTO.setUuid(UUID.randomUUID().toString());
        String key = RedisKeyMapper.from(USER_PREFIX, userDTO.getImie());
        redisService.saveData(key, userDTO);
    }

    public Optional<UserDTO> findWithLogin(String login) {
        String key = RedisKeyMapper.from(USER_PREFIX, login);
        return redisService.getData(key, UserDTO.class);
    }


}
