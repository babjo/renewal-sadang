package org.lch.service;

import org.lch.domain.Todo;
import org.lch.dto.AddTodoRequestDTO;
import org.lch.dto.GetTodoListRequestDTO;
import org.lch.dto.GetTodoListResponseDTO;
import org.lch.dto.RemoveTodoRequestDTO;
import org.lch.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        todo.setContent(addTodoRequestDTO.getContent());
        todo.setUser(addTodoRequestDTO.getUser());
        todo.setCategory(addTodoRequestDTO.getCategory());
        todoRepository.save(todo);
    }

    public GetTodoListResponseDTO getTodoList(GetTodoListRequestDTO getTodoListRequestDTO) {
        if(getTodoListRequestDTO.getCategory() == null)
            return new GetTodoListResponseDTO(todoRepository.findByUser(getTodoListRequestDTO.getUser()));
        else
            return new GetTodoListResponseDTO(todoRepository.findByUserAndCategory(getTodoListRequestDTO.getUser(), getTodoListRequestDTO.getCategory()));
    }

    public void removeTodo(RemoveTodoRequestDTO removeTodoRequestDTO) {
        todoRepository.delete(removeTodoRequestDTO.getUser(), removeTodoRequestDTO.getTodoId());
    }
}
