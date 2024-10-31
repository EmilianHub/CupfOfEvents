package com.cupofevents.infrastructure.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CustomException extends ResponseStatusException {
    public CustomException(HttpStatus status, String cause) {
        super(status, cause);
    }
}
