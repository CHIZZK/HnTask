package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.utils.RandomValidateCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/com/edu/zut/rwdb")
public class RwdbInterfaceURLController {

    private final Logger logger = LoggerFactory.getLogger(RwdbInterfaceURLController.class);

    @RequestMapping("/index")
    public String index(){ return "page/rwdb/index/index"; }
    @RequestMapping("/login")
    public String login(){ return "page/yhzx/login/login"; }

     @RequestMapping("/register")
    public String register(){ return "page/yhzx/register/register"; }


}
