package org.lch.controller;


import org.lch.dto.SignUpRequestDTO;
import org.lch.dto.ExceptionDTO;
import org.lch.dto.SuccessDTO;
import org.lch.exception.FailedLoginException;
import org.lch.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @RequestMapping(value= "/signUp", method= RequestMethod.POST)
    public @ResponseBody SuccessDTO singUp(@RequestBody @Valid SignUpRequestDTO signUpRequestDTO) {
        userService.signUp(signUpRequestDTO);
        return new SuccessDTO();
    }

    @ExceptionHandler(Exception.class)
    public @ResponseBody ExceptionDTO handleException(Exception ex) {
        ExceptionDTO.Error error = new ExceptionDTO.Error();

        if(ex instanceof MethodArgumentNotValidException){
            BindingResult bindingResult = ((MethodArgumentNotValidException) ex).getBindingResult();
            List<ObjectError> errors = bindingResult.getAllErrors();
            String defaultMessage = "";
            for(ObjectError objectError : errors)
                defaultMessage += objectError.toString() + "\n";
            error.setMessage(defaultMessage);
            error.setCode(400);
        }else if(ex instanceof FailedLoginException){
            error.setMessage(ex.getMessage());
            error.setCode(401);
        }else{
            error.setMessage(ex.getMessage());
            error.setCode(400);
        }

        ExceptionDTO exceptionDTO = new ExceptionDTO();
        exceptionDTO.setError(error);
        return exceptionDTO;

    }
}
