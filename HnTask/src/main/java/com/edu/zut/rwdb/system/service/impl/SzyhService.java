package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.LoginMapper;
import com.edu.zut.rwdb.system.mapper.SzyhMapper;
import com.edu.zut.rwdb.system.service.ISzyhService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import com.edu.zut.rwdb.system.utils.PBKDF2Util;
import com.edu.zut.rwdb.system.utils.StringUtils;
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
public class SzyhService implements ISzyhService {
    private final Logger logger = LoggerFactory.getLogger(SzyhService.class);
    @Autowired
    private SzyhMapper szyhMapper;
    @Autowired
    private UuidUtil uuidUtil;
    @Autowired
    private LoginMapper loginMapper;
    @Autowired
    private PBKDF2Util pbkdf2Util;

    @Override
    public AjaxResult savaData(HttpServletRequest request,String yhmc,String xsmc,
                               String email,String tel,String gldw,String dybm) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        int  yhdm = 1;
        if (StringUtils.isNotEmpty(loginMapper.selectYhdm())){
            yhdm = Integer.valueOf(loginMapper.selectYhdm());
            yhdm+=1;
        }
        String pwd = "1234.abcd";
        String salt = null;
        String epwd = null;
        try {
        salt = pbkdf2Util.generateSalt();
        epwd = pbkdf2Util.getEncryptedPassword(pwd,salt);
        }catch (Exception e){
            e.printStackTrace();
        }
        szyhMapper.savaYhxx(uuidUtil.newUuid(),yhdm, yhmc, xsmc, salt, epwd, email, tel, gldw);
        szyhMapper.savaUnitdept(uuidUtil.newUuid(),yhdm, gldw, dybm);
        return success();
    }

    @Override
    public List<Map> findData(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        return szyhMapper.findData();
    }

    @Override
    public AjaxResult updateData(HttpServletRequest request, String gid, String yhdm,String yhmc, String xsmc,String email,String tel,String gldw,String dybm) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        szyhMapper.updateYhxx(gid, xsmc, email, tel, gldw);
        szyhMapper.updateUnitdept(yhdm,  dybm);
        return success();
    }

    @Override
    public AjaxResult stopData(HttpServletRequest request,List<Map> data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        for ( Map map : data){
            szyhMapper.stopData(map.get("gid").toString(),Integer.valueOf(map.get("stoped").toString()));
        }
        return success();
    }

    @Override
    public List<Map> findGldw(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        return szyhMapper.findGldw();
    }

    @Override
    public List<Map> findDybm(HttpServletRequest request, String compid) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        return szyhMapper.findDybm(compid);
    }

    @Override
    public AjaxResult resetPwd(HttpServletRequest request, List<Map> list) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return error("用户未登录系统");
        }
        String pwd = "1234.abcd";
        for (int i=0;i<list.size();i++){
            String gid=list.get(i).get("GID").toString();
            String salt = null;
            String epwd = null;
            try {
                salt = pbkdf2Util.generateSalt();
                epwd = pbkdf2Util.getEncryptedPassword(pwd,salt);
            }catch (Exception e){
                e.printStackTrace();
            }
            szyhMapper.resetPwd(gid, salt, epwd);
        }
        return success();
    }

    @Override
    public List<Map> findYhjs(HttpServletRequest request,String yhdm) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        return szyhMapper.findYhjs(yhdm);
    }

    @Override
    public AjaxResult savePost(HttpServletRequest request, Map data) {
        List<Map> list = (List<Map>) data.get("data");
        String yhdm = data.get("yhdm").toString();
        szyhMapper.deletePostByYhdm(yhdm);
        for (int i=0;i<list.size();i++){
           String postid = list.get(i).get("id").toString();
           String gid = uuidUtil.newUuid();
           szyhMapper.savePost(gid,postid,yhdm);
        }
        return success();
    }
}
