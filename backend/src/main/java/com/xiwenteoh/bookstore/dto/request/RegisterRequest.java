package com.xiwenteoh.bookstore.dto.request;

import com.xiwenteoh.bookstore.validation.ConfirmPassword;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ConfirmPassword(message = "Passwords don't match")
public class RegisterRequest {
    @NotNull
    @NotEmpty(message = "Username must not be empty")
    private String username;

    @NotNull
    @NotEmpty(message = "Password must not be empty")
    private String password;
    private String confirmPassword;

    @NotNull
    @NotEmpty
    @Email(message = "Email format is not valid")
    private String email;
}
