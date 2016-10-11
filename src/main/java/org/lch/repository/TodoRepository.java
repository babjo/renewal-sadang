package org.lch.repository;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.lch.domain.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
}
