package com.edu.zut.rwdb.system.service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Map;

public interface ILoginService {
    List<Map> UserLogin(String username, String pwd, String yzm);
}
