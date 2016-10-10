package org.lch.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by LCH on 2016. 10. 9..
 */
@Data
public class SignUpRequestDTO {

    @Email
    private String email;

    @NotEmpty
    private String password;
}
