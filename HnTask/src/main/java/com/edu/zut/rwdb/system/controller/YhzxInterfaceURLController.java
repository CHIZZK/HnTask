package com.edu.zut.rwdb.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/com/edu/zut/yhzx")
public class YhzxInterfaceURLController {
    @RequestMapping("/szyh")
    public String szyh(){ return "page/yhzx/yhgl/szyh"; }
    @RequestMapping("/szjs")
    public String szjs(){ return "page/yhzx/yhgl/szjs"; }

}