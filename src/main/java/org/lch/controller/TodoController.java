package org.lch.controller;

import org.lch.domain.User;
import org.lch.dto.*;
import org.lch.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Controller
@RequestMapping("/api/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody SuccessDTO addTodo(@RequestBody @Valid AddTodoRequestDTO addTodoRequestDTO){
        addTodoRequestDTO.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        todoService.addTodo(addTodoRequestDTO);
        return new SuccessDTO();
    }

    @RequestMapping(value = "/{todoId}", method = RequestMethod.POST)
    public @ResponseBody SuccessDTO modifyTodo(@PathVariable long todoId, @RequestBody @Valid ModifyTodoRequestDTO modifyTodoRequestDTO){
        modifyTodoRequestDTO.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        modifyTodoRequestDTO.setTodoId(todoId);
        todoService.modifyTodo(modifyTodoRequestDTO);
        return new SuccessDTO();
    }

    @RequestMapping(value = "/{todoId}", method = RequestMethod.DELETE)
    public @ResponseBody SuccessDTO removeTodo(@PathVariable long todoId){
        RemoveTodoRequestDTO removeTodoRequestDTO = new RemoveTodoRequestDTO();
        removeTodoRequestDTO.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        removeTodoRequestDTO.setTodoId(todoId);
        todoService.removeTodo(removeTodoRequestDTO);
        return new SuccessDTO();
    }

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody SuccessDTO getTodoList(GetTodoListRequestDTO getTodoListRequestDTO){
        getTodoListRequestDTO.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return new SuccessDTO(todoService.getTodoList(getTodoListRequestDTO));
    }
}
