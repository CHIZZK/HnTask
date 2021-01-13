package com.edu.zut.rwdb.system.service;

import com.edu.zut.rwdb.system.utils.AjaxResult;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface IRwbxService {
    AjaxResult savaData(HttpServletRequest request, Map data);

    List<Map> findData(HttpServletRequest request);

    AjaxResult updateData(HttpServletRequest request, Map data);

    List<Map> findZrzt(HttpServletRequest request, String gzlb);

    AjaxResult sumitRw(HttpServletRequest request, Map data);

    AjaxResult findUserRole(HttpServletRequest request);

    List<Map> findShyh(HttpServletRequest request);
}
