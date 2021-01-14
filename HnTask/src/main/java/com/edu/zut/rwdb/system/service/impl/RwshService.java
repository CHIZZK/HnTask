package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.RwbxMapper;
import com.edu.zut.rwdb.system.mapper.RwshMapper;
import com.edu.zut.rwdb.system.service.IRwshService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import com.edu.zut.rwdb.system.utils.ConfigUtils;
import com.edu.zut.rwdb.system.utils.UuidUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.edu.zut.rwdb.system.utils.AjaxResult.error;
import static com.edu.zut.rwdb.system.utils.AjaxResult.success;

@Service
public class RwshService implements IRwshService {
    private final Logger logger = LoggerFactory.getLogger(RwshService.class);
    @Autowired
    private RwshMapper rwshMapper;

    @Override
    public List<Map> findData(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        String yhdm = session.getAttribute("yhdm").toString();
        return rwshMapper.findData(yhdm);
    }

    @Override
    public AjaxResult updateData(HttpServletRequest request,Map data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        int  rwzt= Integer.valueOf(data.get("rwzt").toString());
        List<String>  gid = (List<String>) data.get("gid");
        for (int i=0;i<gid.size();i++){
            rwshMapper.updateRwzt(gid.get(i),rwzt);
        }
        return success();
    }
    @Override
    public AjaxResult findUserRole(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return error("用户未登录系统",0);
        }
        String yhdm = session.getAttribute("yhdm").toString();
        List<Map> list= rwshMapper.findUserRole(yhdm);
        for (int i = 0; i<list.size();i++){
            String postname = null;
            if(list.get(i).get("POSTNAME")!=null){
                postname=list.get(i).get("POSTNAME").toString();
            }

            if (ConfigUtils.GSLD_POST_NAME.equals(postname)){
                return success("公司领导",1);
            }else {
                return success("该用户没有权限",0);
            }
        }
        return success("该用户没有权限",0);
    }
}
