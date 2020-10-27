package com.edu.zut.rwdb.system.service;

import com.edu.zut.rwdb.system.utils.AjaxResult;

import javax.servlet.http.HttpServletRequest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Map;

public interface ILoginService {
    AjaxResult UserLogin(HttpServletRequest request, String username, String pwd, String yzm);

    AjaxResult Userregister(HttpServletRequest request, String username, String pwd, String usertype);
}
