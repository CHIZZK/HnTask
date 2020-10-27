package com.edu.zut.rwdb.system.utils;

import org.springframework.stereotype.Component;

import java.util.UUID;
@Component
public class UuidUtil {
    public String newUuid(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }
}
