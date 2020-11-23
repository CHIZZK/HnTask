package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.SzjsMapper;
import com.edu.zut.rwdb.system.service.ISzjsService;
import com.edu.zut.rwdb.system.service.IZzglService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
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
public class SzjsService implements ISzjsService {
    private final Logger logger = LoggerFactory.getLogger(SzjsService.class);
    @Autowired
    private SzjsMapper SzjsMapper;
    @Autowired
    private UuidUtil uuidUtil;

    @Override
    public AjaxResult savaData(HttpServletRequest request, String jsmc, String jsbh) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        String gid= uuidUtil.newUuid();
        SzjsMapper.savaData(gid,jsmc,jsbh);
        return success();
    }

    @Override
    public List<Map> findData(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        return SzjsMapper.findData();
    }

    @Override
    public AjaxResult updateData(HttpServletRequest request,String gid,String jsmc){
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        SzjsMapper.updateData(gid, jsmc);
        return success();
    }

    @Override
    public AjaxResult stopData(HttpServletRequest request,List<Map> data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            return error("用户未登录系统");
        }
        for ( Map map : data){
            SzjsMapper.stopData(map.get("gid").toString(),Integer.valueOf(map.get("stopflag").toString()));
        }
        return success();
    }
}
