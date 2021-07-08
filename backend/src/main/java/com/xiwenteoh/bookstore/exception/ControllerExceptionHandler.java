package com.xiwenteoh.bookstore.exception;

import com.xiwenteoh.bookstore.dto.resource.ErrorResource;
import com.xiwenteoh.bookstore.dto.response.Response;
import com.xiwenteoh.bookstore.exception.custom.BookNotFoundException;
import com.xiwenteoh.bookstore.exception.custom.CartNotFoundException;
import com.xiwenteoh.bookstore.exception.custom.UserNotFoundException;
import com.xiwenteoh.bookstore.security.jwt.AuthEntryPointJwt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@ControllerAdvice
public class ControllerExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    /* [HANDLES]: POST requests that failed validation */
    @ExceptionHandler({
            MethodArgumentNotValidException.class,
            BindException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<?> handleValidationFailed(MethodArgumentNotValidException exception) {
        List<FieldError> errorList = exception.getBindingResult().getFieldErrors();

        List<ErrorResource.ErrorDetail> errorDetails = new ArrayList<>();
        for(FieldError fieldError : errorList) {
            ErrorResource.ErrorDetail errorDetail = new ErrorResource.ErrorDetail();
            errorDetail.setField(fieldError.getField());
            errorDetail.setMessage(fieldError.getDefaultMessage());
            errorDetails.add(errorDetail);
        }

        ErrorResource errorResponse = new ErrorResource();
        errorResponse.setErrors(errorDetails);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.fail,
                        errorResponse
                ),
                HttpStatus.BAD_REQUEST
        );
    }

    /* [HANDLES]: GET, UPDATE book requests that doesn't exist */
    @ExceptionHandler(BookNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<?> handleBookNotFoundException(
            BookNotFoundException exception,
            WebRequest request
    ) {
        ErrorResource.ErrorDetail errorDetail = new ErrorResource.ErrorDetail();
        errorDetail.setField("bookId");
        errorDetail.setMessage(exception.getMessage());

        List<ErrorResource.ErrorDetail> errorDetails = Collections.singletonList(errorDetail);

        ErrorResource errorResponse = new ErrorResource();
        errorResponse.setErrors(errorDetails);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.fail,
                        errorResponse
                ),
                HttpStatus.NOT_FOUND
        );
    }

    /* [HANDLES]: GET, UPDATE users that doesn't exist  */
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<?> handleUserNotFoundException(
            UserNotFoundException exception,
            WebRequest request
    ) {
        ErrorResource.ErrorDetail errorDetail = new ErrorResource.ErrorDetail();
        errorDetail.setField("userId");
        errorDetail.setMessage(exception.getMessage());

        List<ErrorResource.ErrorDetail> errorDetails = Collections.singletonList(errorDetail);

        ErrorResource errorResponse = new ErrorResource();
        errorResponse.setErrors(errorDetails);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.fail,
                        errorResponse
                ),
                HttpStatus.NOT_FOUND
        );
    }

    /* [HANDLES]: cart that doesn't exist  */
    @ExceptionHandler(CartNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<?> handleCartNotFoundException(
            CartNotFoundException exception,
            WebRequest request
    ) {
        ErrorResource.ErrorDetail errorDetail = new ErrorResource.ErrorDetail();
        errorDetail.setField("userId");
        errorDetail.setMessage(exception.getMessage());

        List<ErrorResource.ErrorDetail> errorDetails = Collections.singletonList(errorDetail);

        ErrorResource errorResponse = new ErrorResource();
        errorResponse.setErrors(errorDetails);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.fail,
                        errorResponse
                ),
                HttpStatus.NOT_FOUND
        );
    }

    /* [HANDLES]: IO exception in image read / write */
    @ExceptionHandler(IOException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<?> handleIOException(
            IOException exception
    ) {
        ErrorResource.ErrorDetail errorDetail = new ErrorResource.ErrorDetail();
        errorDetail.setField("image");
        errorDetail.setMessage(exception.getMessage());

        List<ErrorResource.ErrorDetail> errorDetails = Collections.singletonList(errorDetail);

        ErrorResource errorResponse = new ErrorResource();
        errorResponse.setErrors(errorDetails);

        return new ResponseEntity<>(
                new Response<>(
                        Response.StatusType.fail,
                        errorResponse
                ),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
