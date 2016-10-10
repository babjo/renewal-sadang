package org.lch.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

/**
 * Created by LCH on 2016. 10. 7..
 */
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @Column(nullable=false, unique=true)
    private String email;

    @Column(nullable=false)
    private String password;
}
