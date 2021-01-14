package com.edu.zut.rwdb.system.service;

import com.edu.zut.rwdb.system.utils.AjaxResult;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface IJxkpService {

    List<Map> findData(HttpServletRequest request,String wcsx);

    AjaxResult updateData(HttpServletRequest request, List<String> data);

    AjaxResult saveData(HttpServletRequest request, List<Map> data);

    List<Map> findJxcxData(HttpServletRequest request, String wcsx);
}
