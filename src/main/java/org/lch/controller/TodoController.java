package org.lch.controller;

import org.lch.domain.User;
import org.lch.dto.AddTodoRequestDTO;
import org.lch.dto.SuccessDTO;
import org.lch.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Controller
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @RequestMapping(method= RequestMethod.POST)
    public @ResponseBody SuccessDTO addTodo(@RequestBody @Valid AddTodoRequestDTO addTodoRequestDTO){
        addTodoRequestDTO.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        todoService.addTodo(addTodoRequestDTO);
        return new SuccessDTO();
    }
}
