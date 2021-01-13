package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.RwbxMapper;
import com.edu.zut.rwdb.system.service.IRwbxService;
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
public class RwbxService implements IRwbxService {
    private final Logger logger = LoggerFactory.getLogger(RwbxService.class);
    @Autowired
    private RwbxMapper rwbxMapper;
    @Autowired
    private UuidUtil uuidUtil;

    @Override
    public AjaxResult savaData(HttpServletRequest request,Map data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        String cjr = session.getAttribute("yhdm").toString();
        int  gzlb= Integer.valueOf(data.get("gzlb").toString());
        int  gzlx= Integer.valueOf(data.get("gzlx").toString());
        String  gznr= data.get("gznr").toString();
        String  gzbz= data.get("gzbz").toString();
        String  zrzt= data.get("zrzt").toString();
        String  kssj= data.get("kssj").toString();
        String  jssj= data.get("jssj").toString();

        String[] yhdm = zrzt.split(",");
        String gid = uuidUtil.newUuid();
        rwbxMapper.savaRwxx(gid,cjr, gzlb, gzlx, gznr, gzbz, kssj, jssj);
        for (int i=0;i<yhdm.length;i++){
            rwbxMapper.savaZrzt(uuidUtil.newUuid(),gid,yhdm[i]);
        }
        return success();
    }

    @Override
    public List<Map> findData(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        String yhdm = session.getAttribute("yhdm").toString();
        return rwbxMapper.findData(yhdm);
    }

    @Override
    public AjaxResult updateData(HttpServletRequest request,Map data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        int  gzlb= Integer.valueOf(data.get("gzlb").toString());
        int  gzlx= Integer.valueOf(data.get("gzlx").toString());
        String  gznr= data.get("gznr").toString();
        String  gzbz= data.get("gzbz").toString();
        String  zrzt= data.get("zrzt").toString();
        String  kssj= data.get("kssj").toString();
        String  jssj= data.get("jssj").toString();
        String  gid= data.get("gid").toString();

        String[] yhdm = zrzt.split(",");
        rwbxMapper.updateRwxx(gid, gzlb, gzlx, gznr, gzbz, kssj, jssj);
        rwbxMapper.deleteZrzt(gid);
        for (int i=0;i<yhdm.length;i++){
            rwbxMapper.savaZrzt(uuidUtil.newUuid(),gid,yhdm[i]);
        }
        return success();
    }

    @Override
    public List<Map> findZrzt(HttpServletRequest request, String gzlb) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        if("0".equals(gzlb)){
            String dwld = ConfigUtils.DWLD_POST_NAME;
            return rwbxMapper.findZrzt(dwld);
        }else if("1".equals(gzlb)){
            String bmzr = ConfigUtils.BMZR_POST_NAME;
            return rwbxMapper.findZrzt(bmzr);
        }else{
            String ybyg = ConfigUtils.YBYG_POST_NAME;
            return rwbxMapper.findZrzt(ybyg);
        }
    }

    @Override
    public AjaxResult sumitRw(HttpServletRequest request, Map data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return error();
        }
        List<String>  gidlist= (List<String>) data.get("gid");
        String shyh = null;
        if (data.get("shr")!=null){
            shyh = data.get("shr").toString();
            for(int i=0;i<gidlist.size();i++){
                String gid = gidlist.get(i);
                rwbxMapper.sumitRw(1,gid,shyh);
            }
        }else {
            shyh = session.getAttribute("yhdm").toString();
            for(int i=0;i<gidlist.size();i++){
                String gid = gidlist.get(i);
                rwbxMapper.sumitRw(2,gid,shyh);
            }
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
        List<Map> list= rwbxMapper.findUserRole(yhdm);
        for (int i = 0; i<list.size();i++){
            String postname = null;
            if(list.get(i).get("POSTNAME")!=null){
                postname=list.get(i).get("POSTNAME").toString();
            }

            if (ConfigUtils.GSLD_POST_NAME.equals(postname)){
                return success("公司领导",1);
            }else if(ConfigUtils.DWLD_POST_NAME.equals(postname)){
                return success("单位领导",2);
            }else if(ConfigUtils.BMZR_POST_NAME.equals(postname)){
                return success("部门主任",3);
            }else {
                return success("该用户没有权限",0);
            }
        }
        return success("该用户没有权限",0);
    }

    @Override
    public List<Map> findShyh(HttpServletRequest request ) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        return rwbxMapper.findShyh(ConfigUtils.GSLD_POST_NAME);
    }

}
