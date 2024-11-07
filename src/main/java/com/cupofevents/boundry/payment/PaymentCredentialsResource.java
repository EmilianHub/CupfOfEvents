package com.cupofevents.boundry.payment;

import com.cupofevents.control.payment.PaymentCredentialsService;
import com.cupofevents.entity.DTO.PaymentCredentialsDTO;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/payment", method = {RequestMethod.GET, RequestMethod.POST})
@CrossOrigin(value = {"http://localhost:3000/", "http://192.168.178.254/"})
public class PaymentCredentialsResource {

    @Autowired
    PaymentCredentialsService paymentCredentialsService;

    @GetMapping("{userName}")
    public ResponseEntity getUserPaymentCredentials(@PathVariable("userName") String userName) {
        Optional<PaymentCredentialsDTO> userPaymentCredentials = paymentCredentialsService.getUserPaymentCredentials(userName);
        if (userPaymentCredentials.isPresent()) {
            return ResponseEntity.ok(userPaymentCredentials.get());
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}
