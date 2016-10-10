package org.lch.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

/**
 * Created by LCH on 2016. 10. 9..
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequestDTO {

    @Email
    private String email;

    @NotEmpty
    private String password;
}
