package org.lch.service;

import org.lch.domain.User;
import org.lch.dto.*;
import org.lch.exception.FailedLoginException;
import org.lch.exception.UserExistException;
import org.lch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import security.JwtUtil;

/**
 * Created by LCH on 2016. 10. 9..
 */
@Service
@Transactional
public class UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public SignUpResponseDTO signUp(SignUpRequestDTO signUpRequestDTO) {
        if(userRepository.findByEmail(signUpRequestDTO.getEmail()) != null)
            throw new UserExistException();

        User user = new User();
        user.setEmail(signUpRequestDTO.getEmail());
        user.setPassword(signUpRequestDTO.getPassword());
        userRepository.save(user);
        return new SignUpResponseDTO();
    }

    public SignInResponseDTO signIn(SignInRequestDTO signInRequestDTO) {
        User user = userRepository.findByEmailAndPassword(signInRequestDTO.getEmail(), signInRequestDTO.getPassword());
        if(user == null)
             throw new FailedLoginException();

        return new SignInResponseDTO(jwtUtil.generateToken(user));
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email);
    }
}
