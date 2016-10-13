package org.lch.repository;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.lch.domain.Todo;
import org.lch.domain.User;
import org.lch.dto.ModifyTodoRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Repository
public class TodoRepository {

    @Autowired
    private SessionFactory sessionFactory;

    private Session currentSession(){
        return sessionFactory.getCurrentSession();
    }


    public void save(Todo todo) {
        currentSession().save(todo);
    }

    public List<Todo> findByUser(User user) {
        Query query = currentSession().createQuery("select NEW org.lch.domain.Todo(t.id, t.content, t.category, t.createAt, t.completed, t.bookmarked) from Todo as t where t.user = :user");
        query.setParameter("user", user);
        return query.getResultList();
    }

    public List<Todo> findByUserAndCategory(User user, String category) {
        Query query = currentSession().createQuery("select NEW org.lch.domain.Todo(t.id, t.content, t.category, t.createAt, t.completed, t.bookmarked) from Todo as t where t.user = :user and t.category = :category");
        query.setParameter("user", user);
        query.setParameter("category", category);
        return query.getResultList();
    }

    public void delete(User user, long todoId) {
        Todo todo = new Todo();
        todo.setId(todoId);
        todo.setUser(user);
        currentSession().delete(todo);
    }

    public void update(ModifyTodoRequestDTO modifyTodoRequestDTO) {
        Todo todo = currentSession().get(Todo.class, modifyTodoRequestDTO.getTodoId());
        if(todo.getUser().getId() != modifyTodoRequestDTO.getUser().getId())
            throw new IllegalStateException("접근 권한이 없습니다.");

        todo.setId(modifyTodoRequestDTO.getTodoId());
        if(modifyTodoRequestDTO.getCategory() != null) todo.setCategory(modifyTodoRequestDTO.getCategory());
        if(modifyTodoRequestDTO.getContent() != null) todo.setContent(modifyTodoRequestDTO.getContent());
        if(modifyTodoRequestDTO.getCompleted() != null) todo.setCompleted(modifyTodoRequestDTO.getCompleted());
        if(modifyTodoRequestDTO.getBookmarked() != null) todo.setBookmarked(modifyTodoRequestDTO.getBookmarked());
        currentSession().update(todo);
    }
}
