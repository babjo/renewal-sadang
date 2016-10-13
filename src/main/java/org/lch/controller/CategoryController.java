package org.lch.controller;

import org.lch.domain.User;
import org.lch.dto.GetCategoryListRequestDTO;
import org.lch.dto.SuccessDTO;
import org.lch.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by LCH on 2016. 10. 13..
 */
@Controller
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private TodoService todoService;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody SuccessDTO getTodoList(GetCategoryListRequestDTO getCategoryListRequestDTO){
        getCategoryListRequestDTO.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return new SuccessDTO(todoService.getCategoryList(getCategoryListRequestDTO));
    }
}
