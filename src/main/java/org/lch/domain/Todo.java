package org.lch.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Data
@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "TODO_ID")
    private long id;
    private String content;
    private String category;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

}
