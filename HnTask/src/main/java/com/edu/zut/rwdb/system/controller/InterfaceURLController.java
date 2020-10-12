package com.edu.zut.rwdb.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/com/edu/zut/rwdb")
public class InterfaceURLController {
    @RequestMapping("/index")
    public String index(){ return "page/rwdb/index/index"; }
    @RequestMapping("/login")
    public String login(){ return "page/yhzx/login/login"; }
}
