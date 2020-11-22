package com.edu.zut.rwdb.system.service;

import com.edu.zut.rwdb.system.utils.AjaxResult;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface IZzglService {
    AjaxResult savaData(HttpServletRequest request, String sjzz,String zzmc,
                        String zzbh,String zzjc,String zzbz,String dcdw);

    List<Map> findData(HttpServletRequest request);

    AjaxResult updateData(HttpServletRequest request, String gid, String zzmc, String zzbh, String zzjc, String dcdw);

    AjaxResult stopData(HttpServletRequest request, String gid);
}
