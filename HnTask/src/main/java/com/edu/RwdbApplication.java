package com.edu;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
@MapperScan(value = "com.edu.zut.rwdb.system.mapper")
public class RwdbApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(RwdbApplication.class, args);
        System.out.println("启动成功");
    }

}
