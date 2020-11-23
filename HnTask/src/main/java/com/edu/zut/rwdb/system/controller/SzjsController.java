package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.ISzjsService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/com/edu/zut/szjs")
public class SzjsController {
    @Autowired
    private ISzjsService szjsService;
    private final Logger logger = LoggerFactory.getLogger(SzjsController.class);

    /**
     * 查询数据.
     * @return
     */
    @RequestMapping("/findData")
    public List<Map> findData(HttpServletRequest request){
        return szjsService.findData(request);
    }
    /**
     * 保存数据.
     * @return
     */
    @RequestMapping("/savaData")
    public AjaxResult savaData(HttpServletRequest request,String jsmc,String jsbh){
        return szjsService.savaData(request, jsmc, jsbh);
    }
    /**
     * 修改数据.
     * @return
     */
    @RequestMapping("/updateData")
    public AjaxResult updateData(HttpServletRequest request,String gid,String jsmc){
        return szjsService.updateData(request, gid, jsmc);
    }
    /**
     * 停用数据.
     * @return
     */
    @RequestMapping("/stopData")
    public AjaxResult stopData(HttpServletRequest request, @RequestBody List<Map> data){
        return szjsService.stopData(request, data);
    }

}
