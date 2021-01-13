package com.edu.zut.rwdb.system.controller;

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
@RequestMapping("/com/edu/zut/rwsh")
public class RwshController<IRwService> {
    @Autowired
    private IRwshService rwshService;

    private final Logger logger = LoggerFactory.getLogger(RwshController.class);

    /**
     * 查询数据.
     * @return
     */
    @RequestMapping("/findData")
    public List<Map> findData(HttpServletRequest request){
        return rwshService.findData(request);
    }
    /**
     * 修改状态.
     * @return
     */
    @RequestMapping("/updateData")
    public AjaxResult updateData(HttpServletRequest request, @RequestBody Map data){
        return rwshService.updateData(request, data);
    }
    /**
     * 查询用户角色.
     * @return
     */
    @RequestMapping("/findUserRole")
    public AjaxResult findUserRole(HttpServletRequest request){
        return rwshService.findUserRole(request);
    }

}
