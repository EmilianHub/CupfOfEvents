package com.cupofevents.control.payment;

import com.cupofevents.control.redis.RedisService;
import com.cupofevents.entity.DTO.PaymentCredentialsDTO;
import com.cupofevents.infrastructure.mapper.RedisKeyMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.Optional;

@Service
@ApplicationScope
@AllArgsConstructor
public class PaymentCredentialsRepository {

    private static final String KEY_PATTERN = "platnosc_%s";
    private static final String MATCH_ALL_KEY_PATTERN = "*";

    private final RedisService redisService;

    public Optional<PaymentCredentialsDTO> getUserPaymentCredentials(String userName) {
        String userPaymentCredKey = RedisKeyMapper.from(KEY_PATTERN, userName);
        return redisService.getData(userPaymentCredKey, PaymentCredentialsDTO.class);
    }
}
