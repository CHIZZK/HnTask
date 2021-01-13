package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.RwfkMapper;
import com.edu.zut.rwdb.system.service.IRwfkService;
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
public class RwfkService implements IRwfkService {
    private final Logger logger = LoggerFactory.getLogger(RwfkService.class);
    @Autowired
    private RwfkMapper rwfkMapper;
    @Autowired
    private UuidUtil uuidUtil;

    @Override
    public List<Map> findData(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        String yhdm = session.getAttribute("yhdm").toString();
        return rwfkMapper.findData(yhdm);
    }

    @Override
    public AjaxResult updateData(HttpServletRequest request, Map data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return error("用户未登录系统");
        }
        String yhdm = session.getAttribute("yhdm").toString();
        int  sfwc= Integer.valueOf(data.get("sfwc").toString());
        String  wcqksm= data.get("wcqksm").toString();
        String  rwid= data.get("gid").toString();
        boolean flag = false;
        String  fkgid= null;
        if (data.get("fkgid")!=null){
            flag = true;
            fkgid= data.get("fkgid").toString();
        }else{
            fkgid= uuidUtil.newUuid();
        }
        if (flag){
            rwfkMapper.updateRwfk(fkgid,sfwc,wcqksm);
        }else {
            rwfkMapper.saveRwfk(fkgid,rwid,sfwc,wcqksm,yhdm);
        }
        return success();
    }

    @Override
    public AjaxResult rwfk(HttpServletRequest request, List<String> data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return error("用户未登录系统");
        }
        for (int i = 0; i<data.size();i++){
            rwfkMapper.rwfk(data.get(i));
        }
        return success();
    }
}
