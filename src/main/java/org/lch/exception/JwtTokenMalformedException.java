package org.lch.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * Created by LCH on 2016. 10. 10..
 */
public class JwtTokenMalformedException extends AuthenticationException {
    public JwtTokenMalformedException() {
        super("JWT token is not valid");
    }
}
