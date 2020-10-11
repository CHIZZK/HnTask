package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.IDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/com/edu/zut/Database")
public class DatabaseController {
    @Autowired
    private IDatabaseService databaseService;

    @RequestMapping("/test")
    @ResponseBody
    public List<Map> test(){
        return databaseService.test();
    }
}
