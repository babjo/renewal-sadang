package org.lch.dto;

import lombok.Data;
import org.lch.domain.User;

/**
 * Created by LCH on 2016. 10. 12..
 */
@Data
public class ModifyTodoRequestDTO {
    private User user;
    private long todoId;
    private String content;
    private String category;
    private Boolean completed;
    private Boolean bookmarked;
}
