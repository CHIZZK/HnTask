package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.ISzyhService;
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
@RequestMapping("/com/edu/zut/szyh")
public class SzyhController {
    @Autowired
    private ISzyhService szyhService;
    private final Logger logger = LoggerFactory.getLogger(SzyhController.class);

    /**
     * 查询组织数据.
     * @return
     */
    @RequestMapping("/findData")
    public List<Map> findData(HttpServletRequest request){
        return szyhService.findData(request);
    }
    /**
     * 查询角色数据.
     * @return
     */
    @RequestMapping("/findYhjs")
    public List<Map> findYhjs(HttpServletRequest request,String yhdm){
        return szyhService.findYhjs(request,yhdm);
    }
    /**
     * 查询管理单位.
     * @return
     */
    @RequestMapping("/findGldw")
    public List<Map> findGldw(HttpServletRequest request){
        return szyhService.findGldw(request);
    }
    /**
     * 查询管理单位.
     * @return
     */
    @RequestMapping("/findDybm")
    public List<Map> findDybm(HttpServletRequest request,String compid){
        return szyhService.findDybm(request,compid);
    }
    /**
     * 保存组织数据.
     * @return
     */
    @RequestMapping("/savaData")
    public AjaxResult savaData(HttpServletRequest request,String yhmc,String xsmc,String email,String tel,String gldw,String dybm){
        return szyhService.savaData(request, yhmc, xsmc, email, tel, gldw, dybm);
    }
    /**
     * 修改组织数据.
     * @return
     */
    @RequestMapping("/updateData")
    public AjaxResult updateData(HttpServletRequest request,String gid, String yhdm,String yhmc,String xsmc,String email,String tel,String gldw,String dybm){
        return szyhService.updateData(request, gid,yhdm, yhmc,  xsmc, email, tel, gldw, dybm);
    }
    /**
     * 密码重置.
     * @return
     */
    @RequestMapping("/resetPwd")
    public AjaxResult resetPwd(HttpServletRequest request,@RequestBody List<Map> list){
        return szyhService.resetPwd(request, list);
    }
    /**
     * 停用组织数据.
     * @return
     */
    @RequestMapping("/stopData")
    public AjaxResult stopData(HttpServletRequest request, @RequestBody List<Map> data){
        return szyhService.stopData(request, data);
    }
    /**
     * 停用组织数据.
     * @return
     */
    @RequestMapping("/savePost")
    public AjaxResult savePost(HttpServletRequest request, @RequestBody Map data){
        return szyhService.savePost(request, data);
    }
}
