package com.xiwenteoh.bookstore.validation.validator;

import com.xiwenteoh.bookstore.dto.request.RegisterRequest;
import com.xiwenteoh.bookstore.validation.ConfirmPassword;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class ConfirmPasswordValidator implements ConstraintValidator<ConfirmPassword, Object> {

    @Override
    public void initialize(ConfirmPassword constraintAnnotation) {
    }
    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context){
        RegisterRequest user = (RegisterRequest) obj;
        if(user.getPassword().equals(user.getConfirmPassword())) {
            return true;
        } else {
            context.disableDefaultConstraintViolation();
            context
                .buildConstraintViolationWithTemplate("Passwords don't match")
                .addPropertyNode("confirmPassword")
                .addConstraintViolation();
            return false;
        }
    }
}
