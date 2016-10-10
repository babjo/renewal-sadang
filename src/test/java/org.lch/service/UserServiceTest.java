package org.lch.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.lch.dto.SignInRequestDTO;
import org.lch.dto.SignInResponseDTO;
import org.lch.dto.SignUpRequestDTO;
import org.lch.exception.FailedLoginException;
import org.lch.exception.UserExistException;
import org.lch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

/**
 * Created by LCH on 2016. 10. 7..
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/spring/appServlet/test-context.xml"})
@Transactional
public class UserServiceTest {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Test
    public void signUp(){
        signUpAUser();
        assertThat(userRepository.getCount(), is(1));
    }

    private void signUpAUser() {
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO();
        signUpRequestDTO.setEmail("kd980311@naver.com");
        signUpRequestDTO.setPassword("1234");
        userService.signUp(signUpRequestDTO);
    }

    @Test(expected = UserExistException.class)
    public void userExistException(){
        SignUpRequestDTO signUpRequestDTO = new SignUpRequestDTO();
        signUpRequestDTO.setEmail("kd980311@naver.com");
        signUpRequestDTO.setPassword("1234");
        userService.signUp(signUpRequestDTO);
        userService.signUp(signUpRequestDTO);
    }

    @Test
    public void signIn(){
        signUpAUser();
        SignInRequestDTO signInRequestDTO = new SignInRequestDTO("kd980311@naver.com", "1234");
        SignInResponseDTO signInResponseDTO = userService.signIn(signInRequestDTO);
        assertNotNull(signInResponseDTO.getUser());
    }

    @Test(expected = FailedLoginException.class)
    public void failedLoginException(){
        SignInRequestDTO signInRequestDTO = new SignInRequestDTO("kd980311@naver.com", "1234");
        SignInResponseDTO signInResponseDTO = userService.signIn(signInRequestDTO);
        assertNotNull(signInResponseDTO.getUser());
    }
}
