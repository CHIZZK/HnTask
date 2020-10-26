package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.IDatabaseService;
import com.edu.zut.rwdb.system.service.ILoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/com/edu/zut/login")
public class LoginController {
    @Autowired
    private ILoginService loginService;
    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @RequestMapping("/UserLogin")
    @ResponseBody
    public List<Map> UserLogin(String username, String pwd, String yzm){
        return loginService.UserLogin(username, pwd, yzm);
    }
}
