package org.lch.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lch.domain.Todo;

import java.util.List;

/**
 * Created by LCH on 2016. 10. 11..
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetTodoListResponseDTO {
    private List<Todo> todoList;
}
