package org.lch.controller;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @RequestMapping("/simple")
    @ResponseBody
    public Test simple() {
        return new Test(1, 2);
    }

    @AllArgsConstructor
    @Data
    class Test{
        private int a;
        private int b;
    }

}
