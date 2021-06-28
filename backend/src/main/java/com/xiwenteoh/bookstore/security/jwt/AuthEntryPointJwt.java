package com.xiwenteoh.bookstore.security.jwt;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiwenteoh.bookstore.dto.resource.ErrorResource;
import com.xiwenteoh.bookstore.dto.response.Response;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    /* [USAGE]: Triggered every time an unauthenticated User requests a secured HTTP resource */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(APPLICATION_JSON_VALUE);
        response.getWriter().write(getErrorJson(authException));
    }

    private String getErrorJson(AuthenticationException authException) throws JsonProcessingException {

        ErrorResource.ErrorDetail errorDetail = new ErrorResource.ErrorDetail();
        errorDetail.setField("login");

        if(authException.getMessage().equals("Bad credentials")) {
            errorDetail.setMessage("Invalid username / password, please try again");
        }
        else if(authException.getMessage().equals("Banned")) {
            errorDetail.setMessage("Account suspended, please contact support");
        }
        else {
            errorDetail.setMessage("Something went wrong, please contact support");
        }

        List<ErrorResource.ErrorDetail> errorDetails = Collections.singletonList(errorDetail);

        ErrorResource errorResponse = new ErrorResource();
        errorResponse.setErrors(errorDetails);

        Response responseBody = new Response<>(
                Response.StatusType.fail,
                errorResponse
        );

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(responseBody);
    }
}
