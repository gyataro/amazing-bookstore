package com.xiwenteoh.bookstore.dto.request;

import com.xiwenteoh.bookstore.validation.ConfirmPassword;
import com.xiwenteoh.bookstore.validation.UniqueEmail;
import com.xiwenteoh.bookstore.validation.UniqueUsername;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ConfirmPassword
public class RegisterRequest {
    @NotNull
    @NotEmpty(message = "Username must not be empty")
    @UniqueUsername
    private String username;

    @NotNull
    @NotEmpty(message = "Password must not be empty")
    private String password;
    private String confirmPassword;

    @NotNull
    @NotEmpty
    @Email(message = "Email format is not valid")
    @UniqueEmail
    private String email;
}
