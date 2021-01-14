package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.IJxkpService;
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
@RequestMapping("/com/edu/zut/jxkp")
public class JxkpController<IRwService> {
    @Autowired
    private IJxkpService jxkpService;

    private final Logger logger = LoggerFactory.getLogger(JxkpController.class);

    /**
     * 查询数据.
     * @return
     */
    @RequestMapping("/findData")
    public List<Map> findData(HttpServletRequest request,String wcsx){
        return jxkpService.findData(request, wcsx);
    }
    /**
     * 修改状态.
     * @return
     */
    @RequestMapping("/updateData")
    public AjaxResult updateData(HttpServletRequest request, @RequestBody List<String> data){
        return jxkpService.updateData(request, data);
    }
    /**
     * 查询用户角色.
     * @return
     */
    @RequestMapping("/saveData")
    public AjaxResult saveData(HttpServletRequest request, @RequestBody List<Map> data){
        return jxkpService.saveData(request, data);
    }
    /**
     * 查询数据.
     * @return
     */
    @RequestMapping("/findJxcxData")
    public List<Map> findJxcxData(HttpServletRequest request,String wcsx){
        return jxkpService.findJxcxData(request, wcsx);
    }
}
