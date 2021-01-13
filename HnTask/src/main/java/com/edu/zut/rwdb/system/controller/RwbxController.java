package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.IRwbxService;
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
@RequestMapping("/com/edu/zut/rwbx")
public class RwbxController {
    @Autowired
    private IRwbxService rwbxService;
    private final Logger logger = LoggerFactory.getLogger(RwbxController.class);

    /**
     * 查询组织数据.
     * @return
     */
    @RequestMapping("/findData")
    public List<Map> findData(HttpServletRequest request){
        return rwbxService.findData(request);
    }
    /**
     * 查询管理单位.
     * @return
     */
    @RequestMapping("/findZrzt")
    public List<Map> findZrzt(HttpServletRequest request,String gzlb){
        return rwbxService.findZrzt(request,gzlb);
    }
    /**
     * 保存组织数据.
     * @return
     */
    @RequestMapping("/savaData")
    public AjaxResult savaData(HttpServletRequest request, @RequestBody Map data ){
        return rwbxService.savaData(request, data);
    }
    /**
     * 修改组织数据.
     * @return
     */
    @RequestMapping("/updateData")
    public AjaxResult updateData(HttpServletRequest request,@RequestBody Map data){
        return rwbxService.updateData(request, data);
    }
    /**
     * 修改组织数据.
     * @return
     */
    @RequestMapping("/sumitRw")
    public AjaxResult sumitRw(HttpServletRequest request,@RequestBody Map data){
        return rwbxService.sumitRw(request, data);
    }
    /**
     * 查询用户角色.
     * @return
     */
    @RequestMapping("/findUserRole")
    public AjaxResult findUserRole(HttpServletRequest request){
        return rwbxService.findUserRole(request);
    }
    /**
     * 查询审核用户.
     * @return
     */
    @RequestMapping("/findShyh")
    public List<Map> findShyh(HttpServletRequest request ){
        return rwbxService.findShyh(request);
    }
}
