package org.lch.exception;

import org.springframework.security.core.AuthenticationException;

/**
 * Created by LCH on 2016. 10. 10..
 */
public class JwtTokenMissingException extends AuthenticationException {
    public JwtTokenMissingException() {
        super("No JWT token found in request headers");
    }
}
