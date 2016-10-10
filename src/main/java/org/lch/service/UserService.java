package org.lch.service;

import org.lch.domain.User;
import org.lch.dto.SignInRequestDTO;
import org.lch.dto.SignInResponseDTO;
import org.lch.dto.SignUpRequestDTO;
import org.lch.dto.SignUpResponseDTO;
import org.lch.exception.FailedLoginException;
import org.lch.exception.UserExistException;
import org.lch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by LCH on 2016. 10. 9..
 */
@Service
@Transactional
public class UserService {

    @Autowired
    UserRepository userRepository;

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
        return new SignInResponseDTO(user);
    }
}
