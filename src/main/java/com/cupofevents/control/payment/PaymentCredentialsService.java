package com.cupofevents.control.payment;

import com.cupofevents.control.ticket.TicketAsyncEvent;
import com.cupofevents.entity.DTO.PaymentCredentialsDTO;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.Optional;

@Service
@AllArgsConstructor
@ApplicationScope
public class PaymentCredentialsService {

    private final PaymentCredentialsRepository paymentCredentialsRepository;
    private final ApplicationEventPublisher eventPublisher;

    public Optional<PaymentCredentialsDTO> getUserPaymentCredentials(String userName) {
        return paymentCredentialsRepository.getUserPaymentCredentials(userName);
    }

    public boolean payForPurchasedTicket(String userName, String eventName, PaymentCredentialsDTO paymentCredentialsDTO) {
        boolean isValid = validatePaymentCredentials(paymentCredentialsDTO);
        if (isValid) {
            eventPublisher.publishEvent(new TicketAsyncEvent(this, eventName, userName));
        }
        return isValid;
    }

    private boolean validatePaymentCredentials(PaymentCredentialsDTO paymentCredentialsDTO) {
        return validateAccountNumber(paymentCredentialsDTO) && validateAccountCSV(paymentCredentialsDTO);
    }

    private boolean validateAccountNumber(PaymentCredentialsDTO paymentCredentialsDTO) {
        return !paymentCredentialsDTO.getDane().isBlank() && paymentCredentialsDTO.getDane().length() == 16;
    }

    private boolean validateAccountCSV(PaymentCredentialsDTO paymentCredentialsDTO) {
        return !paymentCredentialsDTO.getCsv().isBlank() && paymentCredentialsDTO.getCsv().length() == 3;
    }
}
