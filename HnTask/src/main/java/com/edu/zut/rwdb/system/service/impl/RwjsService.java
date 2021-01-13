package com.edu.zut.rwdb.system.service.impl;

import com.edu.zut.rwdb.system.mapper.RwjsMapper;
import com.edu.zut.rwdb.system.mapper.RwshMapper;
import com.edu.zut.rwdb.system.service.IRwjsService;
import com.edu.zut.rwdb.system.service.IRwshService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import com.edu.zut.rwdb.system.utils.ConfigUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.edu.zut.rwdb.system.utils.AjaxResult.error;
import static com.edu.zut.rwdb.system.utils.AjaxResult.success;

@Service
public class RwjsService implements IRwjsService {
    private final Logger logger = LoggerFactory.getLogger(RwjsService.class);
    @Autowired
    private RwjsMapper rwjsMapper;

    @Override
    public List<Map> findData(HttpServletRequest request, @RequestBody Map data) {
        HttpSession session = request.getSession();
        if (session.getAttribute("yhdm")==null){
            logger.info("用户未登录系统。");
            return new ArrayList<Map>();
        }
        String yhdm = session.getAttribute("yhdm").toString();
        String gznr = data.get("gznr").toString();
        String kssj = data.get("kssj").toString();
        String jssj = data.get("jssj").toString();
        return rwjsMapper.findData(yhdm,gznr,kssj,jssj);
    }
}
