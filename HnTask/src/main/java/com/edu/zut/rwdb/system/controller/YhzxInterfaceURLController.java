package com.edu.zut.rwdb.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/com/edu/zut/yhzx")
public class YhzxInterfaceURLController {
    @RequestMapping("/yhzxlogin")
    public String login(){ return "page/yhzx/login/yhzxlogin"; }
    @RequestMapping("/register")
    public String register(){ return "page/yhzx/register/register"; }
    @RequestMapping("/szyh")
    public String szyh(){ return "page/yhzx/yhgl/szyh"; }
    @RequestMapping("/szjs")
    public String szjs(){ return "page/yhzx/yhgl/szjs"; }
    @RequestMapping("/zzgl")
    public String zzgl(){ return "page/yhzx/yhgl/zzgl"; }
}
