package com.edu.zut.rwdb.system.controller;

import com.edu.zut.rwdb.system.service.IDatabaseService;
import com.edu.zut.rwdb.system.service.ILoginService;
import com.edu.zut.rwdb.system.utils.AjaxResult;
import com.edu.zut.rwdb.system.utils.RandomValidateCodeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/com/edu/zut/login")
public class LoginController {
    @Autowired
    private ILoginService loginService;
    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    /**
     * 用户登录.
     * @param username
     * @param password
     * @param checkcode
     * @return
     */
    @RequestMapping("/UserLogin")
    @ResponseBody
    public AjaxResult UserLogin(HttpServletRequest request, String username, String password, String checkcode){
       int flag = checkVerify(checkcode,request);
        if (flag == 1){
            return loginService.UserLogin(request, username, password, checkcode);
        }else  if (flag == 0){
            return AjaxResult.error("验证码已失效");
        }else {
            return AjaxResult.error("验证码填写错误");
        }
    }

    /**
     * 用户注册.
     * @param username
     * @param password
     * @param usertype
     * @return
     */
    @RequestMapping("/Userregister")
    @ResponseBody
    public AjaxResult Userregister(HttpServletRequest request, String username, String password, String usertype){
        return loginService.Userregister(request, username, password,usertype);
    }
    @RequestMapping(value = "/getVerify")
    public void getVerify(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片
            response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            RandomValidateCodeUtil randomValidateCode = new RandomValidateCodeUtil();
            randomValidateCode.getRandcode(request, response);//输出验证码图片方法
        } catch (Exception e) {
            logger.error("获取验证码失败>>>>   ", e);
        }
    }

    /**
     * 校验验证码
     */
    @RequestMapping(value = "/checkVerify", method = RequestMethod.POST,headers = "Accept=application/json")
    public int checkVerify(@RequestParam String verifyInput, HttpServletRequest request) {
        try{
            //从session中获取随机数
            HttpSession session = request.getSession();
            String inputStr = verifyInput;
            String random = (String) session.getAttribute("RANDOMVALIDATECODEKEY");
            if (random == null) {
                return 0;
            }
            if (random.equals(inputStr)) {
                return 1;
            } else {
                return 2;
            }
        }catch (Exception e){
            logger.error("验证码校验失败", e);
            return 1;
        }
    }
}
