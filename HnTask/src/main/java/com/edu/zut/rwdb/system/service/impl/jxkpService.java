package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.JxkpMapper;
import com.edu.zut.rwdb.system.mapper.RwbxMapper;
import com.edu.zut.rwdb.system.service.IJxkpService;
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
public class jxkpService implements IJxkpService {
    private final Logger logger = LoggerFactory.getLogger(jxkpService.class);
    @Autowired
    private JxkpMapper jxkpMapper;
    @Autowired
    private RwbxMapper rwbxMapper;
    @Autowired
    private UuidUtil uuidUtil;

    @Override
    public List<Map> findData(HttpServletRequest request,String wcsx) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        String yhdm = session.getAttribute("yhdm").toString();
        return jxkpMapper.findData(yhdm, wcsx);
    }

    @Override
    public AjaxResult updateData(HttpServletRequest request,List<String> data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        for (int i=0;i<data.size();i++){
            jxkpMapper.updateSftj(data.get(i));
        }
        return success();
    }

    @Override
    public AjaxResult saveData(HttpServletRequest request, List<Map> data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return error();
        }
        String pfr = session.getAttribute("yhdm").toString();
        List<Map> saveList = new ArrayList<Map>();
        List<Map> updateList = new ArrayList<Map>();
        for (Map map:data){
            if (map.get("KHGID")!=null){
                updateList.add(map);
            }else {
                saveList.add(map);
            }
        }
        if (saveList.size()>0){
            for (int i=0;i<saveList.size();i++){
                String gid= uuidUtil.newUuid();
                String rwid= saveList.get(i).get("GID").toString();
                String yhdm= saveList.get(i).get("YHDM").toString();
                Double pf= Double.valueOf(saveList.get(i).get("PF").toString());
                jxkpMapper.saveList(gid,rwid,yhdm,pf,pfr);
            }

        }
        if (updateList.size()>0){
            for (int i=0;i<updateList.size();i++){
                String khgid= updateList.get(i).get("KHGID").toString();
                Double pf= Double.valueOf(updateList.get(i).get("PF").toString());
                jxkpMapper.updateList(khgid,pf);
            }
        }
        return success();
    }
    @Override
    public List<Map> findJxcxData(HttpServletRequest request,String wcsx) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        String yhdm = session.getAttribute("yhdm").toString();
        AjaxResult result = findUserRole(yhdm);
        String postname = null;
        int flag = 0;
        if ("1".equals(result.get("data").toString())){
            //公司领导查询所有单位领导绩效
            postname = ConfigUtils.DWLD_POST_NAME;
            flag = 1;
        }else if ("2".equals(result.get("data").toString())){
            //单位领导查询所有部门主任和自己的绩效
            postname = ConfigUtils.BMZR_POST_NAME;
            flag = 2;
        }else if ("3".equals(result.get("data").toString())){
            //部门主任查询所有一般员工和自己的绩效
            postname = ConfigUtils.YBYG_POST_NAME;
            flag = 3;
        }else{
            //一般员工查询自己的绩效
            postname = ConfigUtils.YBYG_POST_NAME;
            flag = 4;
        }
        return jxkpMapper.findJxcxData(yhdm, wcsx,postname,flag);
    }
    public AjaxResult findUserRole(String yhdm) {
        List<Map> list= rwbxMapper.findUserRole(yhdm);
        for (int i = 0; i<list.size();i++){
            String postname = null;
            if(list.get(i).get("POSTNAME")!=null){
                postname=list.get(i).get("POSTNAME").toString();
            }
            if (ConfigUtils.GSLD_POST_NAME.equals(postname)){
                return success(ConfigUtils.GSLD_POST_NAME,1);
            }else if(ConfigUtils.DWLD_POST_NAME.equals(postname)){
                return success(ConfigUtils.DWLD_POST_NAME,2);
            }else if(ConfigUtils.BMZR_POST_NAME.equals(postname)){
                return success(ConfigUtils.BMZR_POST_NAME,3);
            }else {
                return success(ConfigUtils.YBYG_POST_NAME,4);
            }
        }
        return success(ConfigUtils.YBYG_POST_NAME,4);
    }
}
