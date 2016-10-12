package org.lch.dto;

import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;
import org.lch.domain.User;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Data
public class AddTodoRequestDTO {

    @NotEmpty
    private String content;
    private String category;
    private User user;
}
