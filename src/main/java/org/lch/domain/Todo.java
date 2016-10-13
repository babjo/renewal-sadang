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

    private boolean completed;
    private boolean bookmarked;

    public Todo(long id, String content, String category, Date createAt, boolean completed, boolean bookmarked){
        this(id, content, category, createAt, completed, bookmarked, null);
    }

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

}
