package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.controller.LoginController;
import com.edu.zut.rwdb.system.mapper.DatabaseMapper;
import com.edu.zut.rwdb.system.mapper.LoginMapper;
import com.edu.zut.rwdb.system.service.IDatabaseService;
import com.edu.zut.rwdb.system.service.ILoginService;
import com.edu.zut.rwdb.system.utils.PBKDF2Util;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Map;

@Service
public class LoginService implements ILoginService {
    private final Logger logger = LoggerFactory.getLogger(LoginService.class);
    @Autowired
    private LoginMapper loginMapper;
    @Autowired
    private PBKDF2Util pbkdf2Util;

    @Override
    public List<Map> UserLogin(String username, String pwd, String yzm){
        try {
            String salt = pbkdf2Util.generateSalt();
            String epwd = pbkdf2Util.getEncryptedPassword(pwd,salt);
            logger.info("PBKDF2加密：" + epwd);
        }catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }
}
