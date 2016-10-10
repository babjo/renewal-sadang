package org.lch.exception;

/**
 * Created by LCH on 2016. 10. 9..
 */
public class FailedLoginException extends RuntimeException {

    public FailedLoginException(){
        super("아이디 또는 패스워드가 틀렸습니다.");
    }
}
