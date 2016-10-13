package org.lch.service;

import org.lch.domain.Todo;
import org.lch.dto.*;
import org.lch.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
        List<Todo> todoList = todoRepository.find(getTodoListRequestDTO);
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

    public GetCategoryListResponseDTO getCategoryList(GetCategoryListRequestDTO getCategoryListRequestDTO) {
        GetTodoListRequestDTO getTodoListRequestDTO = new GetTodoListRequestDTO();
        getTodoListRequestDTO.setUser(getCategoryListRequestDTO.getUser());
        List<Todo> todoList = todoRepository.find(getTodoListRequestDTO);
        List<String> categoryList = new ArrayList();
        for (Todo todo : todoList){
            if(todo.getCategory()!=null && !"".equals(todo.getCategory()) && !containsCaseInsensitive(todo.getCategory(), categoryList))
                categoryList.add(todo.getCategory());
        }
        return new GetCategoryListResponseDTO(categoryList);
    }

    private boolean containsCaseInsensitive(String s, List<String> l){
        for (String string : l){
            if (string.equalsIgnoreCase(s)){
                return true;
            }
        }
        return false;
    }
}
