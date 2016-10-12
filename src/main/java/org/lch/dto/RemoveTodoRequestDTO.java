package org.lch.dto;

import lombok.Data;
import org.lch.domain.User;

/**
 * Created by LCH on 2016. 10. 12..
 */
@Data
public class RemoveTodoRequestDTO {

    private User user;
    private int todoId;
}
