package org.lch.dto;

import lombok.Data;
import org.lch.domain.User;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Data
public class GetTodoListRequestDTO {
    private User user;
}
