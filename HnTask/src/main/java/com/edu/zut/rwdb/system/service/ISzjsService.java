package com.edu.zut.rwdb.system.service;

import com.edu.zut.rwdb.system.utils.AjaxResult;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface ISzjsService {

    List<Map> findData(HttpServletRequest request);

    AjaxResult updateData(HttpServletRequest request,String gid,String jsmc);

    AjaxResult stopData(HttpServletRequest request, List<Map> data);

    AjaxResult savaData(HttpServletRequest request, String jsmc, String jsbh);
}
