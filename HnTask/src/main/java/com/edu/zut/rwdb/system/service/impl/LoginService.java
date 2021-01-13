package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.controller.LoginController;
import com.edu.zut.rwdb.system.mapper.DatabaseMapper;
import com.edu.zut.rwdb.system.mapper.LoginMapper;
import com.edu.zut.rwdb.system.service.IDatabaseService;
import com.edu.zut.rwdb.system.service.ILoginService;
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

import static com.edu.zut.rwdb.system.utils.AjaxResult.error;
import static com.edu.zut.rwdb.system.utils.AjaxResult.success;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class LoginService implements ILoginService {
    private final Logger logger = LoggerFactory.getLogger(LoginService.class);
    @Autowired
    private LoginMapper loginMapper;
    @Autowired
    private PBKDF2Util pbkdf2Util;

    @Autowired
    private UuidUtil uuidutil;
    @Autowired
    private AjaxResult ajaxResult;

    @Override
    public AjaxResult UserLogin(HttpServletRequest request, String username, String pwd, String yzm){
        try {
            List<Map> list = loginMapper.selectYhxx(username);
            if (list.size()==0){
                return error("用户名或密码错误",null);
            }
            String javamm = list.get(0).get("JAVAMM").toString();
            String salt = list.get(0).get("SALT").toString();
            boolean bool = pbkdf2Util.authenticate(pwd,javamm,salt);
            logger.info("密码校验：" + bool);
            if (bool){
                HttpSession session = request.getSession();
                String xsmc = list.get(0).get("XSMC").toString();
                String yhdm = list.get(0).get("YHDM").toString();
                session.setAttribute("xsmc",xsmc);
                session.setAttribute("yhmc",username);
                session.setAttribute("yhdm",yhdm);
                return success("登录成功",null);
            }else{
                return error("登录失败",null);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return error("登录失败",null);
    }

    @Override
    public AjaxResult Userregister(HttpServletRequest request, String username, String pwd ) {
        try {
            if (loginMapper.selectYhmc(username)>0){
                return error("用户名已存在",null);
            }
            String salt = pbkdf2Util.generateSalt();
            String epwd = pbkdf2Util.getEncryptedPassword(pwd,salt);
            logger.info("PBKDF2加密：" + epwd);
            String xsmc="系统管理员";

            int  yhdm = 1;
            if (StringUtils.isNotEmpty(loginMapper.selectYhdm())){
                yhdm = Integer.valueOf(loginMapper.selectYhdm());
                yhdm+=1;
            }
            int type = 0;
            String gid = uuidutil.newUuid();
            loginMapper.Userregister(gid, yhdm, username, salt, epwd, xsmc, type );
            HttpSession session = request.getSession();
            session.setAttribute("xsmc",xsmc);
            session.setAttribute("yhmc",username);
            session.setAttribute("yhdm",yhdm);
        }catch (Exception e){
            e.printStackTrace();
        }
        logger.info("登录成功");
        return success("注册成功",null);
    }

    @Override
    public AjaxResult updatePwd(HttpServletRequest request, String username,
                                String oldpassword, String newpassword) {
        try {
            List<Map> list = loginMapper.selectYhxx(username);
            if (list.size()==0){
                return error("用户名或密码错误",null);
            }
            String javamm = list.get(0).get("JAVAMM").toString();
            String salt = list.get(0).get("SALT").toString();
            boolean bool = pbkdf2Util.authenticate(oldpassword,javamm,salt);
            logger.info("密码校验：" + bool);
            if (bool){
                String newsalt = pbkdf2Util.generateSalt();
                String newepwd = pbkdf2Util.getEncryptedPassword(newpassword,newsalt);
                loginMapper.updatePwd(username,newsalt,newepwd);
                return success("修改成功",null);
            }else{
                return error("用户名或密码错误",null);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return error("修改失败",null);
    }

    @Override
    public AjaxResult getUserName(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return error("查询失败");
        }
        String xsmc = session.getAttribute("xsmc").toString();
        return success("查询成功",xsmc);
    }

    @Override
    public AjaxResult logout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return success("注销成功");
        }
        session.removeAttribute("xsmc");
        session.removeAttribute("yhmc");
        session.removeAttribute("yhdm");
        return success("注销成功");
    }
}
