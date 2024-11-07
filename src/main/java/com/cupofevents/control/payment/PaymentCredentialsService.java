package com.cupofevents.control.payment;

import com.cupofevents.entity.DTO.PaymentCredentialsDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.Optional;

@Service
@AllArgsConstructor
@ApplicationScope
public class PaymentCredentialsService {

    private final PaymentCredentialsRepository paymentCredentialsRepository;

    public Optional<PaymentCredentialsDTO> getUserPaymentCredentials(String userName) {
        return paymentCredentialsRepository.getUserPaymentCredentials(userName);
    }
}
