package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.IDatabaseService;
import com.edu.zut.rwdb.system.service.ILoginService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/com/edu/zut/login")
public class LoginController {
    @Autowired
    private ILoginService loginService;
    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    /**
     * 用户登录.
     * @param username
     * @param password
     * @param checkcode
     * @return
     */
    @RequestMapping("/UserLogin")
    @ResponseBody
    public AjaxResult UserLogin(HttpServletRequest request, String username, String password, String checkcode){
        return loginService.UserLogin(request, username, password, checkcode);
    }

    /**
     * 用户注册.
     * @param username
     * @param password
     * @param usertype
     * @return
     */
    @RequestMapping("/Userregister")
    @ResponseBody
    public AjaxResult Userregister(HttpServletRequest request, String username, String password, String usertype){
        return loginService.Userregister(request, username, password,usertype);
    }

}
