package com.edu.zut.rwdb.system.service;

import com.edu.zut.rwdb.system.utils.AjaxResult;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface IRwfkService {

    List<Map> findData(HttpServletRequest request);

    AjaxResult updateData(HttpServletRequest request, Map data);

    AjaxResult rwfk(HttpServletRequest request, List<String> data);
}
