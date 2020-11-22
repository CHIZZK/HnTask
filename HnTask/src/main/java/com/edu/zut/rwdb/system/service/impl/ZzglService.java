package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.LoginMapper;
import com.edu.zut.rwdb.system.mapper.ZzglMapper;
import com.edu.zut.rwdb.system.service.ILoginService;
import com.edu.zut.rwdb.system.service.IZzglService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import com.edu.zut.rwdb.system.utils.PBKDF2Util;
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
public class ZzglService implements IZzglService {
    private final Logger logger = LoggerFactory.getLogger(ZzglService.class);
    @Autowired
    private ZzglMapper zzglMapper;
    @Autowired
    private UuidUtil uuidUtil;

    @Override
    public AjaxResult savaData(HttpServletRequest request, String sjzz,
                               String zzmc,String zzbh,String zzjc,String zzbz,String dcdw) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        int yhdm = Integer.valueOf(session.getAttribute("yhdm").toString());
        String gid= uuidUtil.newUuid();
        zzglMapper.savaData(gid,yhdm,sjzz, zzmc, zzbh, zzjc, Integer.valueOf(zzbz), Integer.valueOf(dcdw));
        return success();
    }

    @Override
    public List<Map> findData(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        return zzglMapper.findData();
    }

    @Override
    public AjaxResult updateData(HttpServletRequest request, String gid, String zzmc, String zzbh, String zzjc, String dcdw) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        zzglMapper.updateData(gid, zzmc, zzbh, zzjc, Integer.valueOf(dcdw));
        return success();
    }

    @Override
    public AjaxResult stopData(HttpServletRequest request, String gid) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        zzglMapper.stopData(gid);
        return success();
    }
}
