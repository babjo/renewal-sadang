package org.lch.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Created by LCH on 2016. 10. 13..
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetCategoryListResponseDTO {
    private List<String> categoryList;
}
