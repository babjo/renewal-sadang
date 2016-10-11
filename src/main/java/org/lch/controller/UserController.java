package org.lch.controller;


import org.lch.dto.*;
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
    private UserService userService;

    @RequestMapping(value= "/signUp", method= RequestMethod.POST)
    public @ResponseBody SuccessDTO signUp(@RequestBody @Valid SignUpRequestDTO signUpRequestDTO) {
        userService.signUp(signUpRequestDTO);
        return new SuccessDTO();
    }

    @RequestMapping(value= "/signIn", method= RequestMethod.POST)
    public @ResponseBody SuccessDTO signIn(@RequestBody @Valid SignInRequestDTO signInRequestDTO){
        SignInResponseDTO signInResponseDTO = userService.signIn(signInRequestDTO);
        return new SuccessDTO(signInResponseDTO);
    }
}
