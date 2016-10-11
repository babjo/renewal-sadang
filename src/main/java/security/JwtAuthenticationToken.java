package security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

/**
 * Created by LCH on 2016. 10. 10..
 */
public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken {
    private String token;

    public JwtAuthenticationToken(String token){
        super(null, null);
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
