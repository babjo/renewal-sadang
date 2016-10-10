package org.lch.exception;

/**
 * Created by LCH on 2016. 10. 9..
 */
public class UserExistException extends RuntimeException {
    public UserExistException(){
        super("동일한 이메일이 존재합니다.");
    }
}
