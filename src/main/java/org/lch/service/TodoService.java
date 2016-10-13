package org.lch.service;

import org.lch.domain.Todo;
import org.lch.dto.*;
import org.lch.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Service
@Transactional
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public void addTodo(AddTodoRequestDTO addTodoRequestDTO) {
        Todo todo = new Todo();
        todo.setCreateAt(new Date());
        todo.setContent(addTodoRequestDTO.getContent());
        todo.setUser(addTodoRequestDTO.getUser());
        todo.setCategory(addTodoRequestDTO.getCategory()!=null ? addTodoRequestDTO.getCategory().toUpperCase() : addTodoRequestDTO.getCategory());
        todoRepository.save(todo);
    }

    public GetTodoListResponseDTO getTodoList(GetTodoListRequestDTO getTodoListRequestDTO) {
        List<Todo> todoList;
        if(getTodoListRequestDTO.getCategory() == null || "TOTAL".equalsIgnoreCase(getTodoListRequestDTO.getCategory()))
            todoList = todoRepository.findByUser(getTodoListRequestDTO.getUser());
        else
            todoList = todoRepository.findByUserAndCategory(getTodoListRequestDTO.getUser(), getTodoListRequestDTO.getCategory());
        return new GetTodoListResponseDTO(todoList);
    }

    public void removeTodo(RemoveTodoRequestDTO removeTodoRequestDTO) {
        todoRepository.delete(removeTodoRequestDTO.getUser(), removeTodoRequestDTO.getTodoId());
    }

    public void modifyTodo(ModifyTodoRequestDTO modifyTodoRequestDTO) {
        if(modifyTodoRequestDTO.getCategory() != null)
            modifyTodoRequestDTO.setCategory(modifyTodoRequestDTO.getCategory().toUpperCase());
        todoRepository.update(modifyTodoRequestDTO);
    }
}
