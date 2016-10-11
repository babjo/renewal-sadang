package org.lch.controller;

import org.lch.domain.User;
import org.lch.dto.AddTodoRequestDTO;
import org.lch.dto.ExceptionDTO;
import org.lch.dto.GetTodoListRequestDTO;
import org.lch.dto.SuccessDTO;
import org.lch.exception.FailedLoginException;
import org.lch.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import sun.security.provider.Sun;

import javax.validation.Valid;
import java.util.List;

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

    @RequestMapping(method= RequestMethod.GET)
    public @ResponseBody SuccessDTO getTodoList(GetTodoListRequestDTO getTodoListRequestDTO){
        getTodoListRequestDTO.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return new SuccessDTO(todoService.getTodoList(getTodoListRequestDTO));
    }
}
