package org.lch.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.lch.domain.User;

/**
 * Created by LCH on 2016. 10. 9..
 */
@Data
@AllArgsConstructor
public class SignInResponseDTO {
    private String token;
}
