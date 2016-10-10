package org.lch.repository;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.query.Query;
import org.lch.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static sun.security.krb5.Confounder.intValue;

/**
 * Created by LCH on 2016. 10. 7..
 */
@Repository
public class UserRepository {

    @Autowired
    SessionFactory sessionFactory;

    public void save(User user){
        currentSession().save(user);
    }

    public int getCount() {
        return ((Long) currentSession().createQuery("select count(*) from User").uniqueResult()).intValue();
    }

    public User findByEmail(String email) {
        Query query = currentSession().createQuery("from User as user where user.email = :email");
        query.setParameter("email", email);
        List list = query.list();
        if(list.size() == 0) return null;
        else return (User) list.get(0);
    }

    private Session currentSession(){
        return sessionFactory.getCurrentSession();
    }

    public User findByEmailAndPassword(String email, String password) {
        Query query = currentSession().createQuery("from User as user where user.email = :email and user.password = :password");
        query.setParameter("email", email);
        query.setParameter("password", password);
        List list = query.list();
        if(list.size() == 0) return null;
        else return (User) list.get(0);
    }
}
