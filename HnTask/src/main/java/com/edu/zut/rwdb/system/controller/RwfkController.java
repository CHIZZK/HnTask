package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.IRwfkService;
import com.edu.zut.rwdb.system.service.IRwjsService;
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
@RequestMapping("/com/edu/zut/rwfk")
public class RwfkController<IRwService> {
    @Autowired
    private IRwfkService rwfkService;

    private final Logger logger = LoggerFactory.getLogger(RwfkController.class);

    /**
     * 查询数据.
     * @return
     */
    @RequestMapping("/findData")
    public List<Map> findData(HttpServletRequest request){
        return rwfkService.findData(request);
    }
    /**
     * 修改反馈信息.
     * @return
     */
    @RequestMapping("/updateData")
    public AjaxResult updateData(HttpServletRequest request, @RequestBody Map data){
        return rwfkService.updateData(request, data);
    }
    /**
     * 修改反馈信息.
     * @return
     */
    @RequestMapping("/rwfk")
    public AjaxResult rwfk(HttpServletRequest request, @RequestBody List<String> data){
        return rwfkService.rwfk(request, data);
    }
}
