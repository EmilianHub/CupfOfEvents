package com.cupofevents.infrastructure.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.context.annotation.ApplicationScope;

@ApplicationScope
public class CustomExceptionBuilder {
    public static CustomException getCustomException(HttpStatus status, String cause){
        return new CustomException(status,cause);
    }
}
