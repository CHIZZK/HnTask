package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.ILoginService;
import com.edu.zut.rwdb.system.service.IZzglService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import com.edu.zut.rwdb.system.utils.RandomValidateCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/com/edu/zut/zzgl")
public class ZzglController {
    @Autowired
    private IZzglService zzglService;
    private final Logger logger = LoggerFactory.getLogger(ZzglController.class);

    /**
     * 查询组织数据.
     * @return
     */
    @RequestMapping("/findData")
    @ResponseBody
    public List<Map> findData(HttpServletRequest request){
        return zzglService.findData(request);
    }
    /**
     * 保存组织数据.
     * @return
     */
    @RequestMapping("/savaData")
    @ResponseBody
    public AjaxResult savaData(HttpServletRequest request,String sjzz,String zzmc,String zzbh,String zzjc,String zzbz,String dcdw){
        return zzglService.savaData(request, sjzz, zzmc, zzbh, zzjc, zzbz, dcdw);
    }
    /**
     * 修改组织数据.
     * @return
     */
    @RequestMapping("/updateData")
    @ResponseBody
    public AjaxResult updateData(HttpServletRequest request,String gid,String zzmc,String zzbh,String zzjc,String dcdw){
        return zzglService.updateData(request, gid, zzmc, zzbh, zzjc, dcdw);
    }
    /**
     * 停用组织数据.
     * @return
     */
    @RequestMapping("/stopData")
    @ResponseBody
    public AjaxResult stopData(HttpServletRequest request,String gid){
        return zzglService.stopData(request, gid);
    }

}
