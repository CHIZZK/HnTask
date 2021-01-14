package com.edu.zut.rwdb.system.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/com/edu/zut/rwdb")
public class RwdbInterfaceURLController {

    private final Logger logger = LoggerFactory.getLogger(RwdbInterfaceURLController.class);
    @RequestMapping("/rwdblogin")
    public String login(){ return "page/yhzx/login/rwdblogin"; }
    @RequestMapping("/index")
    public String index(){ return "page/rwdb/index/index"; }
    @RequestMapping("/rwbx")
    public String rwbx(){ return "page/rwdb/rwbxjsh/rwbx"; }
    @RequestMapping("/rwsh")
    public String rwsh(){ return "page/rwdb/rwbxjsh/rwsh"; }
    @RequestMapping("/rwfk")
    public String rwfk(){ return "page/rwdb/rwfk/rwfk"; }
    @RequestMapping("/jxkh")
    public String jxkh(){ return "page/rwdb/jxkh/jxkh"; }
    @RequestMapping("/jxkhcx")
    public String jxkhcx(){ return "page/rwdb/jxkh/jxkhcx"; }

}
