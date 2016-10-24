package org.lch.repository;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.lch.domain.Todo;
import org.lch.domain.User;
import org.lch.dto.GetTodoListRequestDTO;
import org.lch.dto.ModifyTodoRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
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

    public List<Todo> find(GetTodoListRequestDTO getTodoListRequestDTO) {

        //Get Criteria Builder
        CriteriaBuilder builder = currentSession().getCriteriaBuilder();

        //Create Criteria
        CriteriaQuery<Todo> criteria = builder.createQuery(Todo.class);
        Root<Todo> todoRoot = criteria.from(Todo.class);

        List<Predicate> ands = new ArrayList();
        ands.add(builder.equal(todoRoot.get("user"), getTodoListRequestDTO.getUser()));

        if(getTodoListRequestDTO.getCategory() != null)
            ands.add(builder.equal(todoRoot.get("category"), getTodoListRequestDTO.getCategory()));

        if(getTodoListRequestDTO.getBookmarked() != null)
            ands.add(builder.equal(todoRoot.get("bookmarked"), getTodoListRequestDTO.getBookmarked()));

        if(getTodoListRequestDTO.getCompleted() != null)
            ands.add(builder.equal(todoRoot.get("completed"), getTodoListRequestDTO.getCompleted()));

        criteria.where(builder.and(ands.toArray(new Predicate[0])));

        return currentSession().createQuery(criteria).getResultList();
    }
}
