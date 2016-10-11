package org.lch.repository;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.lch.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * Created by LCH on 2016. 10. 7..
 */
@Repository
public class UserRepository {

    @Autowired
    private SessionFactory sessionFactory;

    public void save(User user){
        currentSession().save(user);
    }

    public int getCount() {
        return ((Long) currentSession().createQuery("select count(*) from User").uniqueResult()).intValue();
    }

    public User findByEmail(String email) {
        Query query = currentSession().createQuery("from User as u where u.email = :email");
        query.setParameter("email", email);
        List<User> list = query.getResultList();
        if(list.size() == 0) return null;
        else return list.get(0);
    }

    private Session currentSession(){
        return sessionFactory.getCurrentSession();
    }

    public User findByEmailAndPassword(String email, String password) {
        Query query = currentSession().createQuery("from User as u where u.email = :email and u.password = :password");
        query.setParameter("email", email);
        query.setParameter("password", password);
        List<User> list = query.getResultList();
        if(list.size() == 0) return null;
        else return list.get(0);
    }
}
