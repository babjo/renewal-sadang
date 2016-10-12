package org.lch.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "TODO_ID")
    private long id;
    private String content;
    private String category;
    private Date createAt;

    public Todo(long id, String content, String category, Date createAt){
        this(id, content, category, createAt, null);
    }

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

}
