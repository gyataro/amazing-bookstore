package com.xiwenteoh.bookstore.validation.validator;

import com.xiwenteoh.bookstore.dto.request.RegisterRequest;
import com.xiwenteoh.bookstore.repository.UserRepository;
import com.xiwenteoh.bookstore.validation.UniqueEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, Object> {

    @Autowired
    UserRepository userRepository;

    @Override
    public void initialize(UniqueEmail constraintAnnotation) {
    }
    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context){
        RegisterRequest user = (RegisterRequest) obj;
        return !userRepository.existsByEmail(user.getEmail());
    }
}
