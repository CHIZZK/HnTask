package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.IRwjsService;
import com.edu.zut.rwdb.system.service.IRwshService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/com/edu/zut/rwjs")
public class RwjsController<IRwService> {
    @Autowired
    private IRwjsService rwjsService;

    private final Logger logger = LoggerFactory.getLogger(RwjsController.class);

    /**
     * 查询数据.
     * @return
     */
    @RequestMapping("/findData")
    public List<Map> findData(HttpServletRequest request, @RequestBody Map data){
        return rwjsService.findData(request, data);
    }

}
