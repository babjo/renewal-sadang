package org.lch.exception;

/**
 * Created by LCH on 2016. 10. 10..
 */
public class JwtTokenMissingException extends RuntimeException {
    public JwtTokenMissingException() {
        super("No JWT token found in request headers");
    }
}
