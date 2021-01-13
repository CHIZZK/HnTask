package com.edu.zut.rwdb.system.service;

import com.edu.zut.rwdb.system.utils.AjaxResult;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface ISzyhService {
    AjaxResult savaData(HttpServletRequest request,String yhmc,String xsmc,String email,String tel,String gldw,String dybm);

    List<Map> findData(HttpServletRequest request);

    AjaxResult updateData(HttpServletRequest request, String gid, String yhdm,String yhmc, String xsmc,String email,String tel,String gldw,String dybm);

    AjaxResult stopData(HttpServletRequest request, List<Map> data);

    List<Map> findGldw(HttpServletRequest request);

    List<Map> findDybm(HttpServletRequest request, String compid);

    AjaxResult resetPwd(HttpServletRequest request, List<Map> list);

    List<Map> findYhjs(HttpServletRequest request,String yhdm);

    AjaxResult savePost(HttpServletRequest request, Map data);
}
