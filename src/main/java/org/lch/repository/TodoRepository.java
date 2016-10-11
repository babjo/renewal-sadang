package org.lch.repository;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.lch.domain.Todo;
import org.lch.domain.User;
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
        Query query = currentSession().createQuery("select t.id, t.content from Todo as t where t.user = :user");
        query.setParameter("user", user);
        return query.getResultList();
    }
}
